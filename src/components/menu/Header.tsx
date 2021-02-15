import React, { FunctionComponent } from "react";
import HeaderSection from "../sections/HeaderSection";
import MenuText from "./Text";

const MenuHeader: FunctionComponent = () => (
  <HeaderSection
    headline="Meny"
    subhead={<MenuText />}
  />
);

export default MenuHeader;
