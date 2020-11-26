import { NextApiHandler } from "next";
import withAuth from "../../../../../lib/auth/withAuth";
import { ServerLetter } from "../../../../../lib/news/structures/server/Letter";
import { LetterStatic } from "../../../../../lib/news/structures/shared/Letter";

const handler: NextApiHandler<LetterStatic> = async (req, res) => {
  const id = req.query.letter?.toString();

  const letter = await ServerLetter.fetch(id);

  return res.json(letter.serialize());
};

export default withAuth(handler);
