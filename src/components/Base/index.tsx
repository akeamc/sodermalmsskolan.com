import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import useFreshTelegrams from "../../lib/news/hooks/telegram";
import Banner from "../Banner";
import SiteHead, { SiteMetadata } from "../Head";
import Navbar from "../navigation/Navbar";
import TelegramText from "../telegram/TelegramText";

export interface BaseProps {
  metadata?: SiteMetadata;
}

const Base: FunctionComponent<BaseProps> = ({ metadata, children }) => {
  const telegrams = useFreshTelegrams();

  return (
    <>
      <SiteHead metadata={metadata} />
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
      <Navbar />
      <main
        css={(theme: Theme) => ({
          backgroundColor: theme.color.background.primary,
          color: theme.color.text.primary,
        })}
      >
        {children}
      </main>
    </>
  );
};

export default Base;
