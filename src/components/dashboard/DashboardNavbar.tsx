import React, { FunctionComponent } from "react";
import useTime from "../../hooks/useTime";
import LogoIcon from "../logo/Icon";
import WeekNumberBadge from "../WeekNumberBadge";
import styles from "./DashboardNavbar.module.scss";

/**
 * Navbar used in the dashboard. Need I say more?
 *
 * @returns {React.ReactElement} The rendered navbar.
 */
const DashboardNavbar: FunctionComponent = () => {
  const now = useTime();

  return (
    <nav className={styles.navbar}>
      <LogoIcon className={styles.logo} />
      <WeekNumberBadge date={now} />
    </nav>
  );
};

export default DashboardNavbar;
