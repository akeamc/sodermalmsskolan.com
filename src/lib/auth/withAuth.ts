import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME, JWT_SECRET } from "./options";
import jwt from "jsonwebtoken";

/**
 * Assert that the request contains a valid authentication token.
 * @param handler
 */
const withAuth = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    accessToken: string
  ) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
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

    return res.status(403).send("invalid or missing access token");
  };
};

export default withAuth;
