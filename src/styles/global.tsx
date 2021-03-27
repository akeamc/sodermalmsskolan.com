import React, { FunctionComponent } from "react";
import {
  css, Global,
} from "@emotion/react";
import darkTheme from "./themes/dark";
import baseTheme from "./themes/base";
import "./fonts.css";

export const globalStyles = css({
  "body, html": {
    margin: 0,
    backgroundColor: "var(--color-bg-primary)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-sans)",
  },
});

/**
 * A global stylesheet, providing the universal CSS variables. It has dark theme support! 🌑
 *
 * @returns {React.ReactElement} An `@emotion/react` `Global` component.
 */
export const GlobalStyles: FunctionComponent = () => (
  <Global styles={[globalStyles, {
    ":root": {
      ...baseTheme,

      "@media (prefers-color-scheme: dark)": darkTheme,
    },
  }]}
  />
);
