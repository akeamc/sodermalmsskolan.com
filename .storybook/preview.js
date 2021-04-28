import "../src/styles/global.scss";
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
      <Story />
    </RouterContext.Provider>
  ),
]
