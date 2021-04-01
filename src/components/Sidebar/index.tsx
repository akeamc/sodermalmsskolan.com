import React, { FunctionComponent } from "react";

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
  <aside
    css={{
      backgroundColor: "var(--color-bg-secondary)",
      flex: "0 0 300px",
      padding: "0 24px",
    }}
  >
    <div css={{
      position: "sticky",
      top: 0,
      padding: "24px 0",
    }}
    >
      {children}
    </div>
  </aside>
);

export default Sidebar;
