import { NextApiHandler } from "next";
import queryString from "query-string";
import { OAUTH2_OPTIONS } from "../../../lib/auth/options";

const handler: NextApiHandler<void> = async (_, res) => {
  const query = queryString.stringify({
    client_id: OAUTH2_OPTIONS.id,
    redirect_uri: OAUTH2_OPTIONS.callback,
    response_type: "code",
    scope: OAUTH2_OPTIONS.scope,
  });

  res.redirect(`https://discord.com/api/oauth2/authorize?${query}`);
};

export default handler;
