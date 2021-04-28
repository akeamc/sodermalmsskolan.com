import React, { FunctionComponent } from "react";
import SiteHead from "../head/SiteHead";
import { SiteMetadata } from "../head/MetaHead";

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
  <>
    <SiteHead metadata={metadata} />
    <main>
      {children}
    </main>
  </>
);

export default Base;
