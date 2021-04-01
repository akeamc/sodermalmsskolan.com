import React, { FunctionComponent } from "react";
import Sidebar from "../Sidebar";

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
  <div css={{
    display: "flex",
    width: "100%",
  }}
  >
    <main css={{
      flex: 1,
      padding: "0 24px",
    }}
    >
      {children}
    </main>
    <Sidebar>
      {aside}
    </Sidebar>
  </div>
);

export default DashboardContainer;
