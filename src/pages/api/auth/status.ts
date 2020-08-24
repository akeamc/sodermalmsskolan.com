import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "../../../lib/auth/options";
import { IDiscordAPIUser } from "../../../lib/discord/structures/User";
import { getUserInformation } from "../../../lib/auth/flow";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IDiscordAPIUser | string>
) => {
  const token = req.cookies[COOKIE_NAME];

  res.statusCode = 400;

  if (token) {
    try {
      const userInfo = await getUserInformation(token);

      res.statusCode = 200;

      return res.json(userInfo);
    } catch (error) {
      res.statusCode = 403;
    }
  }

  return res.send("invalid token or no token provided");
};
