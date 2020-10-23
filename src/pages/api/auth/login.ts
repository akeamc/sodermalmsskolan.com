import { NextApiHandler } from "next";
import queryString from "query-string";
import { OAUTH2_OPTIONS } from "../../../lib/auth/options";
import {
  AuthorizationQueryString,
  AuthorizationState,
} from "../../../lib/auth/structures/shared/OAuth2";

const handler: NextApiHandler<void> = async (req, res) => {
  const state = new AuthorizationState({
    redirect: req.query.redirect?.toString(),
  });

  const query: AuthorizationQueryString = {
    client_id: OAUTH2_OPTIONS.id,
    redirect_uri: OAUTH2_OPTIONS.callback,
    response_type: "code",
    scope: OAUTH2_OPTIONS.scope,
    state: state.stringify(),
  };

  res.redirect(
    queryString.stringifyUrl({
      url: "https://discord.com/api/oauth2/authorize",
      query,
    })
  );
};

export default handler;
