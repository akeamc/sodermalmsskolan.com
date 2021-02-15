import React from "react";
import { AppProps } from "next/app";
import "dayjs/locale/sv";
import { ToastContainer } from "react-toastify";
import useFreshTelegrams from "../lib/news/hooks/telegram";
import Banner from "../components/Banner";
import TelegramText from "../components/telegram/TelegramText";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "../styles/global";
import { AuthProvider } from "../lib/auth/AuthContext";
import { fonts } from "../styles/text";
import GoogleAnalytics from "../components/analytics/GoogleAnalytics";
import ANALYTICS_ID from "../lib/analytics/constants";

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
  const telegrams = useFreshTelegrams();

  return (
    <AuthProvider>
      <GlobalStyles />

      {telegrams?.length > 0 ? (
        <Banner>
          {telegrams
            .map((telegram) => (
              <span
                key={telegram.id}
                css={{
                  display: "inline-block",
                  margin: "0 2rem",
                }}
              >
                <TelegramText telegram={telegram} />
              </span>
            ))}
        </Banner>
      ) : null}

      <GoogleAnalytics
        trackingId={ANALYTICS_ID}
        appName={process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}
        appVersion={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
      />

      <ToastContainer
        position="bottom-right"
        closeButton={false}
        hideProgressBar
        css={{
          ".Toastify__toast": {
            backgroundColor: "var(--color-bg-primary)",
            color: "var(--color-text-primary)",
            borderRadius: "0.3125rem",
            boxShadow: "var(--shadow-small)",
            padding: "1.5rem",
            fontSize: "1rem",
            fontFamily: fonts.sans,

            "&--success": {
              backgroundColor: "var(--color-bg-success)",
              color: "#ffffff",
            },

            "&--error": {
              backgroundColor: "var(--color-bg-danger)",
              color: "#ffffff",
            },
          },
        }}
      />

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
