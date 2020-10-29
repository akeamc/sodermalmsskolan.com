import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../styles/themes";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useDarkMode } from "../components/theme/useDarkMode";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const [darkMode] = useDarkMode();

  const theme = darkMode ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
