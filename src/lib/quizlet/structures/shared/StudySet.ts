import Serializable from "../../../common/serializable";

export interface StudySetDetails {
  title: string;
  description: string;
  terms: number;
  author: string;
}

export interface StudySetStatic {
  id: string;
  details: StudySetDetails | null;
}

export class StudySet implements Serializable<StudySetStatic> {
  public id: string;

  public details: StudySetDetails | null;

  constructor({ id, details }: StudySetStatic) {
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
   *
   * @param url
   */
  public static parseUrl(url: string): string {
    return url.match(/[0-9]{9}/)[0];
  }

  public serialize(): StudySetStatic {
    return {
      id: this.id,
      details: this.details,
    };
  }
}
