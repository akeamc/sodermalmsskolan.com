import React, { FunctionComponent } from "react";
import HeaderSection from "../sections/HeaderSection";
import MenuText from "./Text";

const MenuHeader: FunctionComponent = () => (
  <HeaderSection
    title="Meny"
    sub={<MenuText />}
  />
);

export default MenuHeader;
