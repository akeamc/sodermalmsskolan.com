import { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";
import { OAUTH2_OPTIONS } from "../../../lib/auth/options";

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const query = queryString.stringify({
    client_id: OAUTH2_OPTIONS.id,
    redirect_uri: OAUTH2_OPTIONS.callback,
    response_type: "code",
    scope: OAUTH2_OPTIONS.scope,
  });

  return res.redirect(`https://discord.com/api/oauth2/authorize?${query}`);
};
