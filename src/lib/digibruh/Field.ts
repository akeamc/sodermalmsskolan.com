import { Tag } from "@tryghost/content-api";
import { DigibruhCollection } from "./Collection";
import Digibruh from "./Digibruh";

export class Field extends DigibruhCollection {
  static get subCollectionRegExp(): null {
    return null;
  }

  get subjectSlug(): string {
    return this.tagSegments[0];
  }

  postUrl(postSlug: string): string {
    return `${this.url}/${postSlug}`;
  }

  /**
   * Returns a regular expression matching `<Digibruh.tagPrefix>-<Subject slug>-<Any field>`. Default is any subject (wildcard).
   */
  static regExp(slug = DigibruhCollection.tagWildcard): RegExp {
    return new RegExp(
      `^${Digibruh.tagPrefix}-${slug}-${DigibruhCollection.tagWildcard}$`,
    );
  }

  constructor(tag: Tag) {
    super(tag);
  }
}
