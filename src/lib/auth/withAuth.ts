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
 * @param {AuthenticatedApiHandler} handler The inner handler to be wrapped.
 *
 * @returns {Promise<void>} lol
 */
const withAuth = <T>(
  handler: AuthenticatedApiHandler<T>,
): NextApiHandler<T | string> => async (req, res) => {
    const token = req.headers.authorization?.split(" ")?.[1];

    if (token) {
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (decoded) => {
          if (decoded) {
            return handler(req, res, decoded);
          }

          return res.status(500).send("unknown error");
        })
        .catch(() => res.status(403).send("invalid access token"));
    }

    return res
      .status(401)
      .send("HTTP `Authorization` header not set or incorrectly formatted");
  };

export default withAuth;
