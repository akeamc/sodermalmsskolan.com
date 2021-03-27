import { GlobalStyles } from "../src/styles/global";
import "../src/fonts.css";

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
