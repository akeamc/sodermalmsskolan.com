import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import SiteHead, { SiteMetadata } from "../Head";
import Navbar from "../navigation/Navbar";

export interface BaseProps {
  metadata?: SiteMetadata;
}

/**
 * The base of the page, with important metadata and common page components such as the navbar.
 */
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
