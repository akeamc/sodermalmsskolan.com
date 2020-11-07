import queryString from "query-string";

export const loginLink = (redirect?: string): string => {
  return queryString.stringifyUrl({
    url: "/api/auth/login",
    query: { redirect },
  });
};
