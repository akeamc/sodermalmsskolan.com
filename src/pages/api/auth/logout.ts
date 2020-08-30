import { NextApiRequest, NextApiResponse } from "next";
import { getAuthCookie } from "../../../lib/auth/cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", getAuthCookie("", 0));
  res.redirect("/");
};
