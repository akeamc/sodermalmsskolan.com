import React from "react";
import { AppProps } from "next/app";
import { GlobalStyles } from "../styles/global";

// DayJS is so lightweight that locales must be imported manually.
import "dayjs/locale/sv";
import useFreshTelegrams from "../lib/news/hooks/telegram";
import Banner from "../components/Banner";
import TelegramText from "../components/telegram/TelegramText";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const telegrams = useFreshTelegrams();

  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}

export default App;
