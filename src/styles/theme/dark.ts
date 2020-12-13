import { Theme } from "@emotion/react";
import { transparentize } from "polished";
import defaultTheme from "./default";

const darkTheme: Theme = {
  ...defaultTheme,
  card: {
    background: "#131618",
  },
  navigation: {
    ...defaultTheme.navigation,
  },
  color: {
    ...defaultTheme.color,
    background: {
      primary: "#000000",
      secondary: "#000000",
    },
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
    border: transparentize(0.9, "#ffffff"),
  },
};

export default darkTheme;
