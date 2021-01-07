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

  public serialize(): StudySetStatic {
    return {
      id: this.id,
      details: this.details,
    };
  }
}
