import { NextApiHandler } from "next";
import withAuth from "../../../lib/auth/withAuth";
import { ServerLetter } from "../../../lib/news/structures/server/Letter";
import { LetterStatic } from "../../../lib/news/structures/shared/Letter";

const handler: NextApiHandler<LetterStatic[]> = async (_, res) => {
  const letters = await ServerLetter.fetchAll();

  return res.json(letters.map((letter) => letter.serialize()));
};

export default withAuth(handler);
