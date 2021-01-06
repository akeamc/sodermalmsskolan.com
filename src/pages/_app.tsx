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

/**
 * The main application, batteries included.
 * @param props
 * @param props.Component bruh
 * @param props.pageProps hello
 * 
 * @returns The application.
 */
function App({ Component, pageProps }: AppProps): JSX.Element {
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
      <ToastContainer position="bottom-left" />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
