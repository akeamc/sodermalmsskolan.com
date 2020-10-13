import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "../styles/themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
