import GlobalStyles from "../styles/global";
import React from "react";
import { AuthProvider } from "../providers/Auth";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "../components/basic/ToastContainer";
import NProgress from "../components/spinners/nprogress";

// DayJS is lightweight, locales must be imported manually.
import "dayjs/locale/sv";

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <AuthProvider>
        <NProgress />
        <StyledToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
