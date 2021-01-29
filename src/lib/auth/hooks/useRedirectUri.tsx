import { useRouter } from "next/router";

export const redirectUriQueryKey = "next";

/**
 * Use the prefilled redirect URI as specified in the query.
 *
 * @param {string} fallback The optional fallback URI.
 *
 * @returns {string} The redirect URI (that falls back to the specified `fallback`).
 */
const useRedirectUri = (fallback = "/konto"): string => {
  const { query } = useRouter();

  return query[redirectUriQueryKey]?.toString() ?? fallback;
};

export default useRedirectUri;
