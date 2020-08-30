import { NextApiRequest, NextApiResponse } from "next";
import { ServerAuthUser } from "../../../lib/auth/structures/server/AuthUser";
import { IAuthUser } from "../../../lib/auth/structures/shared/AuthUser";
import withAuth from "../../../lib/auth/withAuth";

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<IAuthUser | string>,
  accessToken: string
) => {
  const user = await ServerAuthUser.fromAccessToken(accessToken);

  return res.json(user.serialize());
};

export default withAuth(handler);
