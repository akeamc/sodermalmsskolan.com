import cookie, { CookieSerializeOptions } from "cookie";
import { COOKIE_NAME, JWT_SECRET } from "./constants";
import jwt from "jsonwebtoken";

const DEFAULT_COOKIE_OPTIONS: CookieSerializeOptions = {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
};

export const generateAuthCookie = (
  accessToken: string,
  maxAge: number
): string => {
  const webToken = jwt.sign(accessToken, JWT_SECRET);

  return cookie.serialize(COOKIE_NAME, webToken, {
    ...DEFAULT_COOKIE_OPTIONS,
    maxAge,
  });
};

export const destroyAuthCookie = (): string => {
  return cookie.serialize(COOKIE_NAME, "", {
    ...DEFAULT_COOKIE_OPTIONS,
    maxAge: 0,
  });
};
