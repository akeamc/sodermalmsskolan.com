import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import Footer from "../footer/Footer";
import SiteHead, { SiteMetadata } from "../Head";
import DesktopNavbar from "../navigation/DesktopNavbar";
import MobileNavbar from "../navigation/MobileNavbar";

export interface BaseProps {
  metadata?: SiteMetadata;
}

/**
 * The base of the page, with important metadata and common page components such as the navbar.
 */
const Base: FunctionComponent<BaseProps> = ({ metadata, children }) => (
  <>
    <SiteHead metadata={metadata} />
    <DesktopNavbar />
    <main
      css={(theme: Theme) => ({
        backgroundColor: theme.color.background.primary,
        color: theme.color.text.primary,
      })}
    >
      {children}
    </main>
    <Footer />
    <MobileNavbar />
  </>
);

export default Base;
