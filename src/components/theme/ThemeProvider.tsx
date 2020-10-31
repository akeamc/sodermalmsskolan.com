import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { dark, light } from "../../styles/themes";
import { useDarkMode } from "./useDarkMode";

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [darkMode] = useDarkMode();

  const theme = darkMode ? dark : light;

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
