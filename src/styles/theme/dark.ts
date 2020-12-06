import { Theme } from "@emotion/react";
import { transparentize } from "polished";
import defaultTheme from "./default";

const darkTheme: Theme = {
  ...defaultTheme,
  card: {
    background: "#131618",
    boxShadow: `inset 0 0 0 1px ${transparentize(0.95, "#ffffff")}`,
  },
  color: {
    ...defaultTheme.color,
    background: "#000000",
    text: {
      ...defaultTheme.color.text,
      primary: "#ffffff",
      secondary: "#cccccc",
      tertiary: "#a0a0a0",
    },
    skeleton: {
      base: "#333333",
      highlight: "#444444",
    },
  },
};

export default darkTheme;
