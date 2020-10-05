import { NextApiRequest, NextApiResponse } from "next";
import { ServerStudySet } from "../../../lib/quizlet/structures/server/StudySet";
import { StudySetStatic } from "../../../lib/quizlet/structures/shared/StudySet";

export default async (
  _: NextApiRequest,
  res: NextApiResponse<StudySetStatic[]>
) => {
  const studySets = await ServerStudySet.fetchAll();

  return res.json(studySets.map((studySet) => studySet.serialize()));
};
