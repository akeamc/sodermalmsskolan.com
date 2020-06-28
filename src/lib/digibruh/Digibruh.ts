import { PostsOrPages, Tag } from "@tryghost/content-api";
import { getPostsByTag, getPosts } from "../api/ghost/post";
import { Subject } from "./Subject";
import { getTags } from "../api/ghost/tag";
import useSWR from "swr";
import { DigibruhCollection } from "./Collection";
import { Field } from "./Field";

/**
 * A tag manager for Digibruh.
 */
class DigibruhTagArray extends Array<Tag> {
  /**
   * Fetch all `Tag`s whose slug has a prefix matching `Digibruh.tagPrefix`.
   */
  static async fetch(): Promise<DigibruhTagArray> {
    const tags = await getTags();

    let array = new DigibruhTagArray();

    tags.forEach((tag) => {
      array.push(tag);
    });

    return array;
  }

  fields(subjectSlug = DigibruhCollection.tagWildcard): Field[] {
    return this.filter((tag) => Field.regExp(subjectSlug).test(tag.slug)).map(
      (tag) => new Field(tag)
    );
  }

  subjects(): Subject[] {
    return this.filter((tag) => Subject.regExp().test(tag.slug)).map((tag) => {
      let subject = new Subject(tag, []); // Create a subject with no fields now, they will be added when we know the slug of the subject.

      subject.fields = this.fields(subject.slug);
      return subject;
    });
  }
}

export default class Digibruh {
  /**
   * Global tag prefix used on the Ghost backend to differentiate Digibruh posts from non-Digibruh posts.
   */
  static tagPrefix = "hash-skola";

  public tags: DigibruhTagArray;

  get fields(): Field[] {
    return this.tags.fields();
  }

  get subjects(): Subject[] {
    return this.tags.subjects();
  }

  static fetchAllPosts = async (): Promise<PostsOrPages> => {
    return getPostsByTag(Digibruh.tagPrefix, "all");
  };

  static fetchPostsByAuthor = async (slug: string): Promise<PostsOrPages> => {
    return getPosts("all", `authors.slug:${slug}+tag:${Digibruh.tagPrefix}`);
  };

  static async initialize(): Promise<Digibruh> {
    let digibruh = new Digibruh();
    digibruh.tags = await DigibruhTagArray.fetch();

    console.log(digibruh.subjects);

    return digibruh;
  }
}

export const useDigibruh = () => useSWR("/digibruh", Digibruh.initialize);
