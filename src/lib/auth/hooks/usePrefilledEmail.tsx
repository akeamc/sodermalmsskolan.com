import { useRouter } from "next/router";

export const prefilledEmailQueryKey = "email";

const usePrefilledEmail = (): string => {
  const { query } = useRouter();

  return query[prefilledEmailQueryKey]?.toString();
};

export default usePrefilledEmail;
