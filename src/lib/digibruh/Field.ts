import { DigibruhCollection } from "./Collection";
import { Tag, PostOrPage } from "@tryghost/content-api";
import Digibruh from "./Digibruh";
import { GridItem } from "../../components/basic/CardGrid";
import { GenericUser } from "../models/User";

export class Field extends DigibruhCollection {
  static get subCollectionRegExp() {
    return null;
  }

  get subjectSlug(): string {
    return this.tagSegments[0];
  }

  postUrl(postSlug: string): string {
    return `${this.url}/${postSlug}`;
  }

  static postToGridItem({
    title,
    excerpt,
    feature_image,
    slug,
    authors,
    updated_at,
    published_at,
    tags,
  }: PostOrPage): GridItem {
    const fieldTag = tags.find((tag) => Field.regExp().test(tag.slug));

    return {
      title,
      description: excerpt,
      image: feature_image,
      href: new Field(fieldTag).postUrl(slug),
      meta: {
        authors: authors.map(GenericUser.fromAuthor),
        date: new Date(updated_at || published_at),
      },
    };
  }

  /**
   * Returns a regular expression matching `<Digibruh.tagPrefix>-<Subject slug>-<Any field>`. Default is any subject (wildcard).
   */
  static regExp(slug = DigibruhCollection.tagWildcard) {
    return new RegExp(
      `^${Digibruh.tagPrefix}-${slug}-${DigibruhCollection.tagWildcard}$`
    );
  }

  constructor(tag: Tag) {
    super(tag);
  }
}
