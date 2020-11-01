import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME, JWT_SECRET } from "./constants";
import jwt from "jsonwebtoken";
import { destroyAuthCookie } from "./cookie";

export type AuthenticatedApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  accessToken: string
) => void | Promise<void>;

/**
 * Assert that the request contains a valid authentication token.
 * @param handler
 */
const withAuth = (handler: AuthenticatedApiHandler): NextApiHandler => {
  return async (req, res) => {
    const webToken = req.cookies[COOKIE_NAME];

    if (webToken) {
      try {
        const accessToken = jwt.verify(webToken, JWT_SECRET).toString();

        return await handler(req, res, accessToken);
      } catch (error) {
        if (!(error instanceof jwt.JsonWebTokenError)) {
          throw error;
        }
      }
    }

    res.status(403).setHeader("Set-Cookie", destroyAuthCookie());

    return res.send("invalid or missing access token");
  };
};

export default withAuth;
