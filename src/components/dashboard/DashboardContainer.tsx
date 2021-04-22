import classNames from "classnames/bind";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import useKeyboardEffect from "../../hooks/useKeyboardEffect";
import { breakpoints } from "../../styles/breakpoints";
import { MetaHead, SiteMetadata } from "../head/MetaHead";
import styles from "./DashboardContainer.module.scss";
import DashboardNavbar from "./DashboardNavbar";

const cx = classNames.bind(styles);

export interface DashboardContainerProps {
  aside: React.ReactNode,
  meta?: SiteMetadata;
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
  meta,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const shouldShowSidebar = useMediaQuery({
    query: `(min-width: ${breakpoints.medium}px)`,
  });

  useEffect(() => {
    setShowSidebar(shouldShowSidebar);
  }, [shouldShowSidebar]);

  // TODO: This should be replaced with an actual button.
  useKeyboardEffect((event) => {
    if (event.code === "KeyX") {
      setShowSidebar(!showSidebar);
    }
  });

  return (
    <>
      <MetaHead {...meta} />
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
    </>
  );
};

export default DashboardContainer;
