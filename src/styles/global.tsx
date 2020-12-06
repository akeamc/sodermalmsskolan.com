import React, { FunctionComponent } from "react";
import { css, Global } from "@emotion/react";
import { fonts } from "./text";

export const globalStyles = css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: ${fonts.sans};
  }
`;

export const GlobalStyles: FunctionComponent = () => (
  <Global styles={globalStyles} />
);
