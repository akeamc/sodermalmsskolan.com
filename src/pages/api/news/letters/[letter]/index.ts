import { NextApiHandler } from "next";
import withAuth from "../../../../../lib/auth/withAuth";
import ServerLetter from "../../../../../lib/news/structures/server/letter";
import { LetterStatic } from "../../../../../lib/news/structures/shared/letter";

const handler: NextApiHandler<LetterStatic | string> = async (req, res) => {
  const id = req.query.letter?.toString();

  const letter = await ServerLetter.fetch(id).catch(() => null);

  if (!letter) {
    return res.status(404).send(`letter with id \`${id}\` not found`);
  }

  return res.json(letter.serialize());
};

export default withAuth(handler);
