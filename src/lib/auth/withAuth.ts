import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import admin from "../firebase/admin";

export type AuthenticatedApiHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  decoded: admin.auth.DecodedIdToken
) => void | Promise<void>;

/**
 * Assert that the request contains a valid authentication token.
 * **Not to be confused with any client-side HOCs.**
 *
 * @param handler
 */
const withAuth = (handler: AuthenticatedApiHandler): NextApiHandler => async (req, res) => {
  const token = req.headers.authorization?.split(" ")?.[1];

  if (token) {
    return admin
      .auth()
      .verifyIdToken(token)
      .catch(() => res.status(403).send("invalid or missing access token"))
      .then(async (decoded) => {
        if (decoded) {
          return handler(req, res, decoded);
        }
        return res.status(500).send("unknown error");
      });
  }

  return res
    .status(403)
    .send("HTTP `Authorization` header not set or invalid");
};

export default withAuth;
