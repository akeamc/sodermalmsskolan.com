import { User } from "../../models/Discord";
import { RestClient } from "typed-rest-client/RestClient";

export interface StudySet {
  timestamp: Date;
  author: User;
  url: string;
  name: string;
  categories: string[];
  count: number;
}

interface StudySetResponse {
  sets: StudySet[];
}

export async function getStudySets(): Promise<StudySet[]> {
  try {
    const client = new RestClient(
      "api",
      "https://api.xn--sdermalmsskolan-8sb.com"
    );

    const res = await client.get<StudySetResponse>("/quizlet");

    return res.result.sets;
  } catch (error) {
    console.error(error);
    return [];
  }
}
