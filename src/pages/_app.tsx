import React from "react";
import { AppProps } from "next/app";
import "dayjs/locale/sv";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "../styles/global";
import { AuthProvider } from "../lib/auth/AuthContext";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import ANALYTICS_ID from "../lib/analytics/constants";
import "../styles/fonts.css";

/**
 * The main application, batteries included.
 *
 * @param {any} appProps The application props. You don't need to care.
 * @param {any} appProps.Component The inner component.
 * @param {any} appProps.pageProps Page props.
 *
 * @returns {React.ReactElement} The application.
 */
function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <AuthProvider>
      <GlobalStyles />

      <GoogleAnalytics trackingId={ANALYTICS_ID} />

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
