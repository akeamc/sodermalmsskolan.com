import classNames from "classnames/bind";
import React, { FunctionComponent, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "../../styles/breakpoints";
import MainNavbar from "../navigation/MainNavbar";
import styles from "./DashboardContainer.module.scss";
import { useDashboardContext } from "./DashboardContext";
import DashboardNavbar from "./DashboardNavbar";

const cx = classNames.bind(styles);

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
}) => {
  const [{ showSidebar }, dispatch] = useDashboardContext();

  const shouldShowSidebar = useMediaQuery({
    query: `(min-width: ${breakpoints.medium}px)`,
  });

  useEffect(() => {
    dispatch({
      type: "setSidebarState",
      show: shouldShowSidebar,
    });
  }, [dispatch, shouldShowSidebar]);

  return (
    <div className={cx("container")}>
      <DashboardNavbar />
      <div className={cx("columns", {
        "sidebar-hidden": !showSidebar,
      })}
      >
        <main>
          {children}
        </main>
        <aside>
          {aside}
        </aside>
      </div>
    </div>
  );
};

export default DashboardContainer;
