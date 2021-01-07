import queryString from "query-string";
import { prefilledEmailQueryKey } from "./hooks/usePrefilledEmail";
import { redirectUriQueryKey } from "./hooks/useRedirectUri";

export interface AuthQueryParams extends Record<string, string> {
  [prefilledEmailQueryKey]?: string;
  [redirectUriQueryKey]?: string;
}

/**
 * Generate a link used to log in.
 *
 * @param {AuthQueryParams} query The (optional) query to be passed along.
 *
 * @returns {string} The generated path.
 */
export const loginLink = (query?: AuthQueryParams): string => queryString.stringifyUrl({
  url: "/konto/inloggning",
  query,
});

/**
 * Create a link used to sign up.
 *
 * @param {AuthQueryParams} query Query to be included.
 *
 * @returns {string} The generated path.
 */
export const signupLink = (query?: AuthQueryParams): string => queryString.stringifyUrl({
  url: "/konto/registrering",
  query,
});

/**
 * Generate a link used to reset an user's account.
 *
 * @param {AuthQueryParams} query The (optional) query to be passed along.
 *
 * @returns {string} The generated path.
 */
export const resetLink = (query?: AuthQueryParams): string => queryString.stringifyUrl({
  url: "/konto/%c3%a5terst%c3%a4llning",
  query,
});
