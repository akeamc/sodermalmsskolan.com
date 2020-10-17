import { NextApiHandler } from "next";
import { ServerStudySet } from "../../../../lib/quizlet/structures/server/StudySet";
import { StudySetStatic } from "../../../../lib/quizlet/structures/shared/StudySet";

const handler: NextApiHandler<StudySetStatic> = async (req, res) => {
  const id = req.query.set?.toString();

  const sets = await ServerStudySet.fetchAll();

  const set = sets.find((set) => set.id === id);

  if (!set) {
    return res.status(404).end();
  }

  await set.fetchDetails();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(set.serialize());
};

export default handler;
