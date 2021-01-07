import { NextApiHandler } from "next";
import { ServerStudySet } from "../../../../lib/quizlet/structures/server/StudySet";
import { StudySetStatic } from "../../../../lib/quizlet/structures/shared/StudySet";

const handler: NextApiHandler<StudySetStatic> = async (req, res) => {
  const id = req.query.set?.toString();

  const sets = await ServerStudySet.fetchAll();

  const studySet = sets.find((set) => set.id === id);

  if (!studySet) {
    return res.status(404).end();
  }

  await studySet.fetchDetails();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(studySet.serialize());
};

export default handler;
