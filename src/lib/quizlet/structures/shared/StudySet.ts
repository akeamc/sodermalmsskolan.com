import { Serializable } from "../../../common/Serializable";

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
}

export class StudySet implements Serializable<StudySetStatic> {
  public readonly digibruh: StudySetDigibruh;
  public readonly termCount: number;
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;

  constructor({ digibruh, id }: StudySetStatic) {
    this.digibruh = digibruh;
    this.id = id;
  }

  public get url() {
    return `https://quizlet.com/${this.id}`;
  }

  public static get idRegExp() {
    return /[0-9]{9}/;
  }

  public static get pathRegExp() {
    return new RegExp(
      /^\//.source + this.idRegExp.source + /\/([a-z0-9-]+\/)?$/.source
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
    };
  }
}
