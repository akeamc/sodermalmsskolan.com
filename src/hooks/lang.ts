import { useRouter } from "next/router";

export const useLang = (): string => {
  const { locale } = useRouter();

  const lang = locale.split("-")[0];

  return lang;
};
