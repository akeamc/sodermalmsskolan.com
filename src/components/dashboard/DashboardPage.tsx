import React, { FunctionComponent } from "react";
import { SiteMetadata } from "../head/MetaHead";
import SiteHead from "../head/SiteHead";
import MainNavbar from "../navbar/MainNavbar";
import { DashboardContextProvider } from "./DashboardContext";
import styles from "./DashboardPage.module.scss";

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
      <div className={styles.columns}>
        <MainNavbar />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </DashboardContextProvider>
  </>
);

export default DashboardPage;
