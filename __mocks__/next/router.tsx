import { NextRouter } from "next/router";
import nextOptions from "../../next.config";

const { i18n } = nextOptions;

const router: Partial<NextRouter> = {
  locale: i18n.defaultLocale,
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "/",
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
};

// eslint-disable-next-line import/prefer-default-export
export const useRouter = jest.fn(() => ({
  ...router,
}));
