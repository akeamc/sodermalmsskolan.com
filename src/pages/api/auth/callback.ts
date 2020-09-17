import { NextApiRequest, NextApiResponse } from "next";
import { fetchToken } from "../../../lib/auth/flow";
import { generateAuthCookie } from "../../../lib/auth/cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const code = req.query.code.toString();

  if (!code) {
    return res.redirect("/");
  }

  try {
    const oauthToken = await fetchToken(code);

    res.setHeader(
      "Set-Cookie",
      generateAuthCookie(oauthToken.access_token, oauthToken.expires_in)
    );

    return res.redirect("/konto");

    // return res.redirect("/");
  } catch (error) {
    console.error(error);

    res.statusCode = 403;
    res.send("big oof");
  }
};
