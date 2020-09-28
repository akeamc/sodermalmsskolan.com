import { Tag, PostsOrPages } from "@tryghost/content-api";
import { getPostsByTag } from "../ghost/post";
import Digibruh from "./Digibruh";
import { GridItem } from "../../components/basic/CardGrid";

/**
 * Generic collection for use within Digibruh.
 */
export abstract class DigibruhCollection {
  static tagWildcard = "[a-zA-Z0-9]+";

  /**
   * URL of the collection to use on this website.
   */
  get url(): string {
    return `/digibruh/${this.tagSegments.join("/")}`;
  }

  /**
   * Slug to use on this website.
   */
  get slug(): string {
    return this.tagSegments[this.tagSegments.length - 1];
  }

  /**
   * Generate a regular expression for finding child collection tags.
   */
  get subCollectionRegExp(): RegExp | null {
    return new RegExp(`^${this.tag.slug}-${DigibruhCollection.tagWildcard}$`);
  }

  get tagSegments() {
    return this.tag.slug.split("-").slice(Digibruh.tagPrefix.split("-").length);
  }

  /**
   * A regular expression matching all tags whose slug matches a `DigibruhCollection` of this type.
   */
  static regExp(slug: string = DigibruhCollection.tagWildcard): RegExp | null {
    return null;
  }

  toGridItem(): GridItem {
    return {
      title: this.name,
      description: this.description,
      href: this.url,
      image: this.coverImage,
    };
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
