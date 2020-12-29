import React, { FunctionComponent } from "react";
import {
  css, Global,
} from "@emotion/react";
import { fonts } from "./text";
import spacingVariables from "./spacing";
import baseTheme from "./themes/base";

export const globalStyles = css({
  "html, body": {
    margin: 0,
    padding: 0,
    fontFamily: fonts.sans,
    wordBreak: "break-word",
  },

  ":root": {
    ...spacingVariables,
  },

  "::selection": {
    background: "var(--color-highlight)",
    color: "#ffffff",
  },
});

export const GlobalStyles: FunctionComponent = () => {
  const theme = baseTheme; // TODO: Dark mode support

  return (
    <Global styles={[globalStyles, {
      ":root": theme,
    }]}
    />
  );
};
