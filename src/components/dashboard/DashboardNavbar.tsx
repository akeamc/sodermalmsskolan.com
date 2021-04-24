import React, { FunctionComponent } from "react";
import { Menu } from "react-feather";
import Button from "../Button";
import LogoIcon from "../logo/Icon";
import { useDashboardContext } from "./DashboardContext";
import styles from "./DashboardNavbar.module.scss";

/**
 * Navbar used in the dashboard. Need I say more?
 *
 * @returns {React.ReactElement} The rendered navbar.
 */
const DashboardNavbar: FunctionComponent = () => {
  const [{ showSidebar }, dispatch] = useDashboardContext();

  return (
    <nav className={styles.navbar}>
      <LogoIcon className={styles.logo} />
      <Button
        icon={Menu}
        variant="tertiary"
        onClick={() => dispatch({
          show: !showSidebar,
          type: "setSidebarState",
        })}
        title="Meny"
      />
    </nav>
  );
};

export default DashboardNavbar;
