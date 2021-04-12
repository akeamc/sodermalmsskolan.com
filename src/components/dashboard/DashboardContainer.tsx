import React, { FunctionComponent } from "react";
import styles from "./DashboardContainer.module.scss";

export interface DashboardContainerProps {
  aside: React.ReactNode,
}

/**
 * The main container for dashboards.
 *
 * @param {React.PropsWithChildren<DashboardContainerProps>} props Props.
 *
 * @returns {React.ReactElement} A rendered dashboard.
 */
const DashboardContainer: FunctionComponent<DashboardContainerProps> = ({
  children,
  aside,
}) => (
  <div className={styles.container}>
    <main className={styles.main}>
      {children}
    </main>
    <aside className={styles.sidebar}>
      {aside}
    </aside>
  </div>
);

export default DashboardContainer;
