import classNames from "classnames/bind";
import React, { FunctionComponent, useEffect, useState } from "react";
import useKeyboardEffect from "../../hooks/useKeyboardEffect";
import useWindowSize from "../../hooks/useWindowSize";
import styles from "./DashboardContainer.module.scss";

const cx = classNames.bind(styles);

export interface DashboardContainerProps {
  aside: React.ReactNode,
}

/**
 * React hook that returns `true` or `false` whether the viewport is large enough to comfortably
 * display the sidebar.
 *
 * @returns {boolean} `true` is the device is large enough.
 */
export const useSidebarRecommendation = (): boolean => {
  const { width } = useWindowSize();

  return width > 1024;
};

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
  const shouldShowSidebar = useSidebarRecommendation();
  const [showSidebar, setShowSidebar] = useState(false);

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
    <div className={cx("container", {
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
  );
};

export default DashboardContainer;
