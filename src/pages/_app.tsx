import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ThemeProvider } from "../components/theme/ThemeProvider";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
