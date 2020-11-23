import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "../components/basic/ToastContainer";

import "dayjs/locale/sv";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AuthProvider>
        <StyledToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
