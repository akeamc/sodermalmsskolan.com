import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { StudySet, StudySetStatic } from "../shared/StudySet";

export class ClientStudySet extends StudySet {
  public static get fetchAllUrl(): string {
    return "/api/quizlet/sets";
  }

  public static async fetchAll(): Promise<ClientStudySet[]> {
    const res = await ky.get(this.fetchAllUrl).json<StudySetStatic[]>();

    return res.map((studySet) => new ClientStudySet(studySet));
  }

  public static useAll(): responseInterface<ClientStudySet[], unknown> {
    return useSWR(this.fetchAllUrl, () => this.fetchAll());
  }

  public static fetchUrl(id: string): string {
    return `/api/quizlet/sets/${id}`;
  }

  public static async fetch(id: string): Promise<ClientStudySet> {
    if (!id) {
      return null;
    }

    const res = await ky.get(this.fetchUrl(id)).json<StudySetStatic>();

    return new ClientStudySet(res);
  }

  public static use(id: string): responseInterface<ClientStudySet, unknown> {
    return useSWR(this.fetchUrl(id), () => this.fetch(id));
  }
}
