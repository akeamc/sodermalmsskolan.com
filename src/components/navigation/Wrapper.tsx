import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";

const NavbarWrapper: FunctionComponent = (props) => (
  <div
    css={(theme: Theme) => ({
      backgroundColor: theme.color.background.primary,
      height: theme.navigation.height,
      boxSizing: "border-box",
      position: "sticky",
      left: 0,
      right: 0,
      zIndex: 1000,
    })}
    {...props}
  />
);

export default NavbarWrapper;
