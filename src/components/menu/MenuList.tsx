import React, { FunctionComponent } from "react";
import useMenus from "../../lib/food/hooks/useMenus";
import MenuDisplay from "./MenuDisplay";

/**
 * A list of menus.
 *
 * @returns {React.ReactElement} The rendered list.
 */
const MenuList: FunctionComponent = () => {
  const menus = useMenus();

  return (
    <ul>
      {(menus ?? new Array(30).fill(undefined)).map((menu, i) => (
        <MenuDisplay menu={menu} key={menu?.date ?? i} />
      ))}
    </ul>
  );
};

export default MenuList;
