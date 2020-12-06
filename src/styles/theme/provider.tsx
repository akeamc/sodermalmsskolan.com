import React, { FunctionComponent } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import defaultTheme from "./default";
import Color from "./color";

declare module "@emotion/react" {
  export interface Theme {
    color: Color;
  }
}

export const ThemeProvider: FunctionComponent = ({ children }) => (
  <EmotionThemeProvider theme={defaultTheme}>{children}</EmotionThemeProvider>
);
