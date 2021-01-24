import { useRouter } from "next/router";

export const redirectUriQueryKey = "next";

const useRedirectUri = (): string => {
  const { query } = useRouter();

  return query[redirectUriQueryKey]?.toString() ?? "/konto";
};

export default useRedirectUri;
