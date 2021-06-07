import React from "react";
import { AppProps } from "next/app";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import ANALYTICS_ID from "../lib/analytics/constants";
import "../styles/global.scss";

/**
 * The main application, batteries included.
 *
 * @param {AppProps} appProps The application props. You don't need to care.
 *
 * @returns {React.ReactElement} The application.
 */
function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <>
      <GoogleAnalytics trackingId={ANALYTICS_ID} />
      <Component {...pageProps} />
    </>
  );
}

export default App;
