import { Theme } from "@emotion/react";
import { transparentize } from "polished";

const defaultTheme: Theme = {
  isDark: false,
  card: {
    background: "#ffffff",
    boxShadow: `0px 4px 12px ${transparentize(0.9, "#000000")}`,
  },
  color: {
    background: "#ffffff",
    accent: "#4969ed",
    text: {
      primary: "#24292e",
      secondary: "#586069",
      tertiary: "#6a737d",
      white: "#ffffff",
    },
    skeleton: {
      base: "#eaeaea",
      highlight: "#fafafa",
    },
  },
};

export default defaultTheme;
