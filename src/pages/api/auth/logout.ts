import { NextApiHandler } from "next";
import { generateAuthCookie } from "../../../lib/auth/cookie";

const handler: NextApiHandler<void> = (_, res) => {
  res.setHeader("Set-Cookie", generateAuthCookie("", 0));
  res.redirect("/");
};

export default handler;
