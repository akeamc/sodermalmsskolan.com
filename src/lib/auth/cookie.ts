import cookie from "cookie";
import { COOKIE_NAME } from "./options";

export const getAuthCookie = (value: string, maxAge: number): string => {
  return cookie.serialize(COOKIE_NAME, value, {
    sameSite: "lax",
    path: "/",
    maxAge,
  });
};
