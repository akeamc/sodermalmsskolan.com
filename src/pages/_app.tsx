import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { ThemeProvider } from "styled-components";
import { baseTheme } from "../styles/themes";
import { AppProps } from "next/dist/next-server/lib/router/router";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
