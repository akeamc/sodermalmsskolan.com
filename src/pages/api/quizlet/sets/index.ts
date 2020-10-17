import { NextApiHandler } from "next";
import { ServerStudySet } from "../../../../lib/quizlet/structures/server/StudySet";
import { StudySetStatic } from "../../../../lib/quizlet/structures/shared/StudySet";

const handler: NextApiHandler<StudySetStatic[]> = async (_, res) => {
  const studySets = await ServerStudySet.fetchAll();

  return res.json(studySets.map((studySet) => studySet.serialize()));
};

export default handler;
