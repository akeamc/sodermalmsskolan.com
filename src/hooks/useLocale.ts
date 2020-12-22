import { useRouter } from "next/router";

export interface LocalizationDetails {
  /**
   * The UTS locale identifier.
   */
  locale: string;

  /**
   * The language spoken, derived from `locale`.
   */
  language: string;
}

/**
 * Hook used to get the locale from the router.
 */
const useLocale = (): LocalizationDetails => {
  const { locale } = useRouter();

  return {
    locale,
    language: locale.split("-")[0],
  };
};

export default useLocale;
