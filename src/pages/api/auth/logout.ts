import { NextApiRequest, NextApiResponse } from "next";
import { generateAuthCookie } from "../../../lib/auth/cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", generateAuthCookie("", 0));
  res.redirect("/");
};
