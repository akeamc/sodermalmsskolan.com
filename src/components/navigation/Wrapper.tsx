import React, { FunctionComponent } from "react";

const NavbarWrapper: FunctionComponent = (props) => (
  <div
    css={{
      backgroundColor: "var(--color-bg-primary)",
      height: "var(--navbar-height)",
      boxSizing: "border-box",
      position: "sticky",
      left: 0,
      right: 0,
      zIndex: 1000,
    }}
    {...props}
  />
);

export default NavbarWrapper;
