import React, { FunctionComponent } from "react";
import BannerAd from "../ads/BannerAd";
import Container from "../Container";
import Footer from "../footer/Footer";
import SiteHead, { SiteMetadata } from "../Head";
import MainNavbar from "../navigation/MainNavbar";
import MobileNavbar from "../navigation/MobileNavbar";

export interface BaseProps {
  metadata?: SiteMetadata;
  leadingAd?: boolean;
  navbar?: boolean;
  footer?: boolean;
}

/**
 * The base of the page, with important metadata and common page components such as the navbar.
 */
const Base: FunctionComponent<BaseProps> = ({
  metadata,
  leadingAd = false,
  children,
  navbar = true,
  footer = true,
}) => (
  <>
    <SiteHead metadata={metadata} />
    {navbar ? <MainNavbar /> : null}
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
    {footer ? <Footer /> : null}
    {navbar ? <MobileNavbar /> : null}
  </>
);

export default Base;
