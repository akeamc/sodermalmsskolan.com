import React from "react";
import { AppProps } from "next/app";
import { GlobalStyles } from "../styles/global";

// DayJS is so lightweight that locales must be imported manually.
import "dayjs/locale/sv";
import { ThemeProvider } from "../styles/theme/provider";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
