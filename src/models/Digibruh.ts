import { Tag, getTags } from "../api/ghost/tags";
import { getPostsByTag, Post, getPostBySlug } from "../api/ghost/posts";

export const digibruhTag = "hash-skola";

interface IField {
  name: string;
  tagSlug: string;
  description: string | null;
}

export class Field implements IField {
  name: string;
  tagSlug: string;
  description: string | null;

  static regex(subject: string) {
    return new RegExp(`hash-skola-${subject}-[a-z]+$`, "i");
  }

  constructor({ name, tagSlug: slug, description }: IField) {
    this.name = name;
    this.tagSlug = slug;
    this.description = description;
  }

  getPosts = async (): Promise<Post[]> => {
    return getPostsByTag(this.tagSlug);
  };

  toObject(): IField {
    return {
      name: this.name,
      tagSlug: this.tagSlug,
      description: this.description,
    };
  }

  static fromTag(tag: Tag): Field {
    return new Field({
      name: tag.name.substring(1),
      tagSlug: tag.slug,
      description: tag.description,
    });
  }

  static fromTags(tags: Tag[], subject: string): Field[] {
    return tags
      .filter((tag) => Field.regex(subject).test(tag.slug))
      .map(Field.fromTag);
  }
}

interface ISubject {
  name: string;
  tagSlug: string;
  fields: IField[];
  coverImage: string | null;
  description: string | null;
}

export class Subject implements ISubject {
  name: string;
  tagSlug: string;
  fields: Field[];
  coverImage: string | null;
  description: string | null;

  static regex(subject: string = "[a-z]+") {
    return new RegExp(`hash-skola-${subject}$`, "i");
  }

  get slug() {
    return this.tagSlug.substring(this.tagSlug.lastIndexOf("-") + 1);
  }

  constructor({
    name,
    tagSlug: tag,
    fields = [],
    coverImage = null,
    description = null,
  }: ISubject) {
    this.name = name;
    this.tagSlug = tag;
    this.fields = fields.map((field) => new Field(field));
    this.coverImage = coverImage;
    this.description = description;
  }

  static fromTag(tag: Tag, fields: Field[] = []): Subject {
    return new Subject({
      name: tag.name.substring(1),
      tagSlug: tag.slug,
      fields,
      coverImage: tag.feature_image || null,
      description: tag.description,
    });
  }

  getPostUrl(post: Post): string {
    return `/digibruh/${this.slug}/${post.slug}`;
  }

  getPosts = async (): Promise<Post[]> => {
    return getPostsByTag(this.tagSlug);
  };

  getPost = async (slug: string): Promise<Post> => {
    const post = await getPostBySlug(slug);

    if (!post.tags.some(tag => Subject.regex(this.name))) {
      throw new Error("Post does not contain mandatory tag. This is not a Digibruh post.");
    }

    return post;
  };

  toObject(): ISubject {
    return {
      name: this.name,
      tagSlug: this.tagSlug,
      fields: this.fields.map((field) => field.toObject()),
      coverImage: this.coverImage,
      description: this.description,
    };
  }

  static async get(name: string): Promise<Subject> {
    const tags = await getTags();

    let tag = tags.find((tag) => Subject.regex(name).test(tag.slug));
    let fields = Field.fromTags(tags, name);

    if (!tag) {
      throw new Error("Subject not found!");
    }

    return Subject.fromTag(tag, fields);
  }

  static fromTags(tags: Tag[]): Subject[] {
    return tags
      .filter((tag) => Subject.regex().test(tag.slug))
      .map((tag) => {
        let subject = Subject.fromTag(tag);
        let fields = Field.fromTags(tags, subject.slug);
        subject.fields = fields;
        return subject;
      });
  }
}
