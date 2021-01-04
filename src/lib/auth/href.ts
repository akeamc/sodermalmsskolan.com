import queryString from "query-string";
import { prefilledEmailQueryKey } from "./hooks/usePrefilledEmail";
import { redirectUriQueryKey } from "./hooks/useRedirectUri";

export interface AuthQueryParams extends Record<string, string> {
  [prefilledEmailQueryKey]?: string;
  [redirectUriQueryKey]?: string;
}

export const loginLink = (query: AuthQueryParams): string => queryString.stringifyUrl({
  url: "/konto/inloggning",
  query,
});

export const signupLink = (query: AuthQueryParams): string => queryString.stringifyUrl({
  url: "/konto/registrering",
  query,
});
