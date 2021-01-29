import { useRouter } from "next/router";

export const prefilledEmailQueryKey = "email";

/**
 * Use the prefilled email, from the query parameter.
 *
 * @returns {string} The (possibly undefined) email.
 */
const usePrefilledEmail = (): string => {
  const { query } = useRouter();

  return query[prefilledEmailQueryKey]?.toString();
};

export default usePrefilledEmail;
