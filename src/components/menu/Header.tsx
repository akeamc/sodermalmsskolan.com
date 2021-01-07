import React, { FunctionComponent } from "react";
import SimpleHeader from "../header/Simple";
import MenuText from "./Text";

const MenuHeader: FunctionComponent = () => (
  <SimpleHeader
    title="Meny"
    sub={<MenuText />}
  />
);

export default MenuHeader;
