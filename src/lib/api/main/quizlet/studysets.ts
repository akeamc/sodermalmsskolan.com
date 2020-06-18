import { StudySet } from "../../../models/Quizlet";
import client from "../client";

interface StudySetResponse {
  sets: StudySet[];
}

export async function getStudySets(): Promise<StudySet[]> {
  try {
    const res = await client.get<StudySetResponse>("/quizlet");

    return res.result.sets;
  } catch (error) {
    console.error(error);
    return [];
  }
}
