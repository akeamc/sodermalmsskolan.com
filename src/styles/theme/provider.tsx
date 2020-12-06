import React, { FunctionComponent } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import defaultTheme from "./default";
import Color from "./color";
import { CardTheme } from "./card";

declare module "@emotion/react" {
  export interface Theme {
    color: Color;
    card: CardTheme;
    isDark: boolean;
  }
}

export const ThemeProvider: FunctionComponent = ({ children }) => (
  <EmotionThemeProvider theme={defaultTheme}>{children}</EmotionThemeProvider>
);
