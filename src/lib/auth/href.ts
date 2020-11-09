import queryString from "query-string";

export const loginLink = (redirect?: string): string => {
  return queryString.stringifyUrl({
    url: "/konto/login",
    query: { redirect },
  });
};

export const signupLink = (): string => {
  return "/konto/skapa";
};

export const resetAccountLink = (): string => {
  return "/konto/reset";
};
