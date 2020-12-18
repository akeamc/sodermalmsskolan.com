import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import SiteHead, { SiteMetadata } from "../Head";
import Navbar from "../navigation/Navbar";

export interface BaseProps {
  metadata?: SiteMetadata;
}

const Base: FunctionComponent<BaseProps> = ({ metadata, children }) => (
  <>
    <SiteHead metadata={metadata} />
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

export default Base;
