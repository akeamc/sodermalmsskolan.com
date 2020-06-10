import { Tag } from "../api/ghost/tags";

export const digibruhTag = "hash-skola";

export class Field {
  name: string;
  slug: string;
  description: string | null;

  static regex(subject: string) {
    return new RegExp(`hash-skola-${subject}-[a-z]+$`, "i");
  }

  constructor(name: string, slug: string, description: string | null) {
    this.name = name;
    this.slug = slug;
    this.description = description;
  }

  static fromTag(tag: Tag): Field {
    return new Field(
      tag.name.substring(tag.name.indexOf("-")),
      tag.slug,
      tag.description
    );
  }

  static fromTags(tags: Tag[], subject: string): Field[] {
    return tags
      .filter((tag) => this.regex(subject).test(tag.slug))
      .map(this.fromTag);
  }
}

export class Subject {
  static regex = /hash-skola-[a-z]+$/i;
  name: string;
  tag: string;
  fields: Field[];
  coverImage?: string;

  get slug() {
    return this.tag.substring(this.tag.lastIndexOf("-") + 1);
  }

  constructor({
    name,
    tag,
    fields = [],
    coverImage = null,
  }: {
    name: string;
    tag: string;
    fields?: Field[];
    coverImage?: string;
  }) {
    this.name = name;
    this.tag = tag;
    this.fields = fields;
    this.coverImage = coverImage;
  }

  static fromTag(tag: Tag, fields: Field[] = []): Subject {
    return new Subject({
      name: tag.name.substring(1),
      tag: tag.slug,
      fields,
      coverImage: tag.feature_image || null,
    });
  }
}

export function getSubjectsFromTags(tags: Tag[]): Subject[] {
  return tags
    .filter((tag) => Subject.regex.test(tag.slug))
    .map((tag) => {
      let subject = Subject.fromTag(tag);
      let fields = Field.fromTags(tags, subject.slug);
      subject.fields = fields;
      return subject;
    });
}
