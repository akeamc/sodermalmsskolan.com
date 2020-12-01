import { PostsOrPages, Tag, PostOrPage } from "@tryghost/content-api";
import { getPostsByTag, getPosts, getPostBySlug } from "../ghost/post";
import { Subject } from "./Subject";
import { getTags } from "../ghost/tag";
import useSWR, { responseInterface } from "swr";
import { DigibruhCollection } from "./Collection";
import { Field } from "./Field";
import Serializable from "../common/serializable";
import { ParsedUrlQuery } from "querystring";

/**
 * A static variant of `Digibruh`, used mostly for SSR (because you cannot serialize classes with JSON).
 */
export interface DigibruhStatic {
  tags: Tag[];
}

export interface DigibruhSubjectPath extends ParsedUrlQuery {
  subject: string;
}

export interface DigibruhFieldPath extends DigibruhSubjectPath {
  field: string;
}

export interface DigibruhPostPath extends DigibruhFieldPath {
  post: string;
}

/**
 * A tag manager for Digibruh.
 */
export class DigibruhTags extends Array<Tag> {
  /**
   * Fetch all `Tag`s whose slug has a prefix matching `Digibruh.tagPrefix`.
   */
  public static async fetch(): Promise<DigibruhTags> {
    const tags = await getTags();

    return new DigibruhTags(...tags);
  }

  public fields(subjectSlug = DigibruhCollection.tagWildcard): Field[] {
    return this.filter((tag) => Field.regExp(subjectSlug).test(tag.slug)).map(
      (tag) => new Field(tag)
    );
  }

  public subjects(): Subject[] {
    return this.filter((tag) => Subject.regExp().test(tag.slug)).map((tag) => {
      const subject = new Subject(tag, []); // Create a subject with no fields, they will be added when we know the slug of the subject.

      subject.fields = this.fields(subject.slug);

      return subject;
    });
  }
}

export default class Digibruh implements Serializable<DigibruhStatic> {
  /**
   * Global tag prefix used on the Ghost backend to differentiate Digibruh posts from non-Digibruh posts.
   */
  public static tagPrefix = "hash-skola";

  public tags: DigibruhTags;

  public get fields(): Field[] {
    return this.tags.fields();
  }

  public get subjects(): Subject[] {
    return this.tags.subjects();
  }

  public getSubjectBySlug(slug: string): Subject | null {
    return this.subjects.find((subject) => subject.slug === slug) || null;
  }

  public getFieldBySlug(subjectSlug: string, fieldSlug: string): Field | null {
    return (
      this.fields.find(
        (field) => field.subjectSlug == subjectSlug && field.slug == fieldSlug
      ) || null
    );
  }

  public static getPostPath(post: PostOrPage): DigibruhPostPath {
    const tags = new DigibruhTags(...post.tags);

    const subject = tags.subjects()[0];
    const field = tags.fields()[0];

    return {
      subject: subject.slug,
      field: field.slug,
      post: post.slug,
    };
  }

  public async fetchPostBySlug(slug: string): Promise<PostOrPage | null> {
    const post = await getPostBySlug(slug);

    if (!post.tags.find((tag) => tag.slug == Digibruh.tagPrefix)) {
      return null;
    }

    return post;
  }

  public static fetchAllPosts = async (): Promise<PostsOrPages> => {
    return getPostsByTag(Digibruh.tagPrefix, "all");
  };

  public static fetchPostsByAuthor = async (
    slug: string
  ): Promise<PostsOrPages> => {
    return getPosts("all", `authors.slug:${slug}+tag:${Digibruh.tagPrefix}`);
  };

  public static async initialize(): Promise<Digibruh> {
    return new Digibruh({ tags: await DigibruhTags.fetch() });
  }

  public constructor(options: DigibruhStatic) {
    this.tags = new DigibruhTags(...options.tags);
  }

  public serialize(): DigibruhStatic {
    return {
      tags: new Array(...this.tags),
    };
  }

  public static use(
    initialData?: DigibruhStatic
  ): responseInterface<Digibruh, unknown> {
    return useSWR("/digibruh", Digibruh.initialize, {
      initialData: initialData ? new Digibruh(initialData) : null,
    });
  }
}
