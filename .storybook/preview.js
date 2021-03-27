import { GlobalStyles } from "../src/styles/global";
import "../src/styles/fonts.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />

      <Story />
    </>
  )
]
