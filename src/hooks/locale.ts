import "dayjs/locale/sv";

export interface Localization {
  locale: string;
}

export const useLocale = (): Localization => {
  return { locale: "sv" };
};
