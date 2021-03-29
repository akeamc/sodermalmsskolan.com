import { GlobalStyles } from "../src/styles/global";
import "../src/styles/fonts.scss";
import "dayjs/locale/sv";
import { RouterContext } from "next/dist/next-server/lib/router-context";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <RouterContext.Provider value={{
      locale: "sv-SE",
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      basePath: "/",
    }}>
      <GlobalStyles />

      <Story />
    </RouterContext.Provider>
  ),
]
