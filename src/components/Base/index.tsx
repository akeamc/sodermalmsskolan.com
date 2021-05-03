import React, { FunctionComponent } from "react";
import SiteHead from "../head/SiteHead";
import { SiteMetadata } from "../head/MetaHead";
import Footer from "../Footer";

export interface BaseProps {
  metadata?: SiteMetadata;
}

/**
 * The base of the page, with important metadata and common page components such as the navbar.
 *
 * @param {React.PropsWithChildren<BaseProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered base.
 */
const Base: FunctionComponent<BaseProps> = ({
  metadata,
  children,
}) => (
  <div className="flex flex-col min-h-screen">
    <SiteHead metadata={metadata} />
    <main className="container">
      {children}
    </main>
    <Footer className="mt-auto" />
  </div>
);

export default Base;
