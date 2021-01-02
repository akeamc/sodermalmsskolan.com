import React, { FunctionComponent } from "react";
import BannerAd from "../ads/BannerAd";
import Container from "../Container";
import Footer from "../footer/Footer";
import SiteHead, { SiteMetadata } from "../Head";
import DesktopNavbar from "../navigation/DesktopNavbar";
import MobileNavbar from "../navigation/MobileNavbar";

export interface BaseProps {
  metadata?: SiteMetadata;
  leadingAd?: boolean;
}

/**
 * The base of the page, with important metadata and common page components such as the navbar.
 */
const Base: FunctionComponent<BaseProps> = ({ metadata, leadingAd = false, children }) => (
  <>
    <SiteHead metadata={metadata} />
    <DesktopNavbar />
    <main
      css={{
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      {leadingAd ? (
        <Container>
          <BannerAd />
        </Container>
      ) : null}
      {children}
    </main>
    <Footer />
    <MobileNavbar />
  </>
);

export default Base;
