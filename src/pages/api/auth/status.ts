import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "../../../lib/auth/options";
import { ServerAuthUser } from "../../../lib/auth/structures/server/AuthUser";
import { IAuthUser } from "../../../lib/auth/structures/shared/AuthUser";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IAuthUser | string>
) => {
  const token = req.cookies[COOKIE_NAME];

  res.statusCode = 400;

  if (token) {
    try {
      const user = await ServerAuthUser.fromAccessToken(token);

      res.statusCode = 200;

      return res.json(user.serialize());
    } catch (error) {
      res.statusCode = 403;
    }
  }

  return res.send("invalid token or no token provided");
};
