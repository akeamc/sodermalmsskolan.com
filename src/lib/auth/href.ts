import queryString from "query-string";

export const loginLink = (redirect?: string): string => queryString.stringifyUrl({
  url: "/konto/login",
  query: { redirect },
});

export const signupLink = (): string => "/konto/skapa";

export const resetAccountLink = (): string => "/konto/reset";
