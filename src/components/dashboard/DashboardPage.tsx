import React, { FunctionComponent } from "react";
import { SiteMetadata } from "../head/MetaHead";
import SiteHead from "../head/SiteHead";
import { DashboardContextProvider } from "./DashboardContext";

export interface DashboardPageProps {
  metadata?: SiteMetadata;
}

/**
 * A dashboard page.
 *
 * @param {React.PropsWithChildren<DashboardPageProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered page.
 */
const DashboardPage: FunctionComponent<DashboardPageProps> = ({
  metadata,
  children,
}) => (
  <>
    <SiteHead metadata={metadata} />
    <DashboardContextProvider>
      {children}
    </DashboardContextProvider>
  </>
);

export default DashboardPage;
