import React, { FunctionComponent } from "react";
import styles from "./index.module.scss";

/**
 * A sidebar.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} A rendered sidebar.
 */
const Sidebar: FunctionComponent = ({
  children,
}) => (
  <aside className={styles.sidebar}>
    <div className={styles.sticky}>
      {children}
    </div>
  </aside>
);

export default Sidebar;
