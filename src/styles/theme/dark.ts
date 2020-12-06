import { Theme } from "@emotion/react";
import { darken } from "polished";
import defaultTheme from "./default";

const darkTheme: Theme = {
  ...defaultTheme,
  color: {
    ...defaultTheme.color,
    background: "#000000",
    text: {
      ...defaultTheme.color.text,
      primary: "#ffffff",
      secondary: "#cccccc",
      tertiary: "#a0a0a0",
    },
  },
};

export default darkTheme;
