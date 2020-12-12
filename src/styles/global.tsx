import React, { FunctionComponent } from "react";
import {
  css, Global, SerializedStyles, Theme,
} from "@emotion/react";
import { fonts } from "./text";

export const globalStyles = (theme: Theme): SerializedStyles => css({
  "html, body": {
    margin: 0,
    padding: 0,
    fontFamily: fonts.sans,
    wordBreak: "break-word",
  },

  "::selection": {
    background: theme.color.accent,
    color: "#ffffff",
  },
});

export const GlobalStyles: FunctionComponent = () => <Global styles={globalStyles} />;
