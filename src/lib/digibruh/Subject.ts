import { DigibruhCollection } from "./Collection";
import { Tag } from "@tryghost/content-api";
import Digibruh from "./Digibruh";
import { Field } from "./Field";

/**
 * A Digibruh subject.
 */
export class Subject extends DigibruhCollection {
  /**
   * Returns a regular expression matching `<Digibruh.tagPrefix>-<Subject slug>`. Default is any subject (wildcard).
   */
  static regExp(slug = DigibruhCollection.tagWildcard) {
    return new RegExp(`^${Digibruh.tagPrefix}-${slug}$`);
  }

  constructor(tag: Tag, public fields: Field[]) {
    super(tag);
  }
}
