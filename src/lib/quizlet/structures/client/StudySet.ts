import ky from "ky-universal";
import useSWR from "swr";
import { StudySet, StudySetStatic } from "../shared/StudySet";

export class ClientStudySet extends StudySet {
  public static async fetchAll() {
    const res = await ky.get("/api/quizlet/sets").json<StudySetStatic[]>();

    return res.map((studySet) => new ClientStudySet(studySet));
  }

  public static useAll() {
    return useSWR("/api/quizlet/sets", ClientStudySet.fetchAll);
  }
}
