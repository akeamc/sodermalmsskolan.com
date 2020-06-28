import { DigibruhCollection } from "./Collection";
import { Tag } from "@tryghost/content-api";
import Digibruh from "./Digibruh";

export class Field extends DigibruhCollection {
  get slug() {
    return "";
  }

  get url() {
    return "";
  }

  static get subCollectionRegExp() {
    return null;
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
