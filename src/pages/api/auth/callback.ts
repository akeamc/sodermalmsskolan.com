import { NextApiHandler } from "next";
import { fetchToken } from "../../../lib/auth/flow";
import { generateAuthCookie } from "../../../lib/auth/cookie";
import { AuthorizationState } from "../../../lib/auth/structures/shared/OAuth2";

const handler: NextApiHandler<void | string> = async (req, res) => {
  const code = req.query.code?.toString();

  if (!code) {
    res.redirect("/");
    return;
  }

  try {
    const oauthToken = await fetchToken(code);

    res.setHeader(
      "Set-Cookie",
      generateAuthCookie(oauthToken.access_token, oauthToken.expires_in)
    );

    const serializedState = req.query.state?.toString();

    if (!serializedState) {
      throw new Error("`state` query parameter is missing");
    }

    const state = AuthorizationState.parse(serializedState);

    res.redirect(state.redirect);
  } catch (error) {
    console.error(error);

    res.statusCode = 403;
    return res.send("big oof");
  }
};

export default handler;
