import { Tag, PostsOrPages } from "@tryghost/content-api";
import { getPostsByTag } from "../api/ghost/post";

/**
 * Generic collection for use within Digibruh.
 */
export abstract class DigibruhCollection {
  static tagWildcard = "[a-zA-Z0-9]+";

  /**
   * URL of the collection to use on this website.
   */
  abstract get url(): string;

  /**
   * Slug to use on this website.
   */
  abstract get slug(): string;

  /**
   * Generate a regular expression for finding child collection tags.
   */
  get subCollectionRegExp(): RegExp | null {
    return new RegExp(`^${this.tag.slug}-${DigibruhCollection.tagWildcard}$`);
  }

  /**
   * A regular expression matching all tags whose slug matches a `DigibruhCollection` of this type.
   */
  static regExp(slug: string = DigibruhCollection.tagWildcard): RegExp | null {
    return null;
  }

  get name(): string {
    let tagName = this.tag.name || "";
    return tagName.substring(tagName.indexOf("#") + 1);
  }

  get description(): string {
    return this.tag.description || "";
  }

  get coverImage(): string | null {
    return this.tag.feature_image || null;
  }

  async posts(): Promise<PostsOrPages> {
    return getPostsByTag(this.tag.slug);
  }

  constructor(public tag: Tag) {}
}
