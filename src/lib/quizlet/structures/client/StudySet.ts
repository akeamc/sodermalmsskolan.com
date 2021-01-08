import ky from "ky-universal";
import useSWR from "swr";
import { IdQuery } from "../../../common/query";
import { UseSWRResource } from "../../../common/usable";
import { StudySet, StudySetStatic } from "../shared/StudySet";

export class ClientStudySet extends StudySet {
  public static get fetchAllUrl(): string {
    return "/api/quizlet/sets";
  }

  public static async fetchAll(): Promise<ClientStudySet[]> {
    const res = await ky.get(this.fetchAllUrl).json<StudySetStatic[]>();

    return res.map((studySet) => new ClientStudySet(studySet));
  }

  public static fetchUrl(id: string): string {
    return `/api/quizlet/sets/${id}`;
  }

  public static async fetch(id: string): Promise<ClientStudySet> {
    if (!id) {
      return undefined;
    }

    const res = await ky.get(this.fetchUrl(id)).json<StudySetStatic>();

    return new ClientStudySet(res);
  }
}

export const useStudySet: UseSWRResource<ClientStudySet, IdQuery> = ({
  id,
}) => useSWR(ClientStudySet.fetchUrl(id), () => ClientStudySet.fetch(id), {
  revalidateOnFocus: false,
});

export const useStudySets: UseSWRResource<ClientStudySet[]> = () => useSWR(
  ClientStudySet.fetchAllUrl,
  () => ClientStudySet.fetchAll(),
);
