import { Theme } from "@emotion/react";
import { lighten, transparentize } from "polished";

const defaultTheme: Theme = {
  isDark: false,
  card: {
    background: "#ffffff",
  },
  navigation: {
    boxShadow: `0 1px 0 0 ${transparentize(0.9, "#000000")}`,
    height: "3.75rem",
  },
  shadow: {
    large: `0 60px 120px -10px ${transparentize(0.8, "#000000")}`,
  },
  color: {
    background: "#ffffff",
    accent: "#4969ed",
    text: {
      primary: "#000000",
      secondary: lighten(0.25, "#000000"),
      tertiary: lighten(0.5, "#000000"),
      white: "#ffffff",
    },
    skeleton: {
      base: "#eaeaea",
      highlight: "#fafafa",
    },
    border: transparentize(0.9, "#000000"),
  },
};

export default defaultTheme;
