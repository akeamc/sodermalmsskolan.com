import Serializable from "../../../common/serializable";

export interface StudySetDetails {
  title: string;
  description: string;
  terms: number;
  author: string;
}

export interface StudySetDigibruh {
  subjects: string[];

  /**
   * The Digibruh field of the study set, determined by the article in which the study set is linked.
   */
  fields: string[];
}

export interface StudySetStatic {
  digibruh: StudySetDigibruh;
  id: string;
  details: StudySetDetails | null;
}

export class StudySet implements Serializable<StudySetStatic> {
  public digibruh: StudySetDigibruh;

  public id: string;

  public details: StudySetDetails | null;

  constructor({ digibruh, id, details }: StudySetStatic) {
    this.digibruh = digibruh;
    this.id = id;
    this.details = details || null;
  }

  public get url(): string {
    return `https://quizlet.com/${this.id}`;
  }

  public static get idRegExp(): RegExp {
    return /[0-9]{9}/;
  }

  public static get pathRegExp(): RegExp {
    return new RegExp(
      /^\//.source + this.idRegExp.source + /\/([a-z0-9-]+\/)?$/.source,
    );
  }

  /**
   * Extract the id from a Quizlet study set url.
   */
  public static parseUrl(url: string): string {
    return url.match(/[0-9]{9}/)[0];
  }

  public serialize(): StudySetStatic {
    return {
      digibruh: this.digibruh,
      id: this.id,
      details: this.details,
    };
  }
}
