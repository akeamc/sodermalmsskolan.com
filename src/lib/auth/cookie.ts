import cookie from "cookie";
import { COOKIE_NAME, JWT_SECRET } from "./options";
import jwt from "jsonwebtoken";

export const getAuthCookie = (accessToken: string, maxAge: number): string => {
  const webToken = jwt.sign(accessToken, JWT_SECRET);

  return cookie.serialize(COOKIE_NAME, webToken, {
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    maxAge,
  });
};
