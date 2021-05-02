import React, { FunctionComponent } from "react";
import useMenus from "../../lib/food/hooks/useMenus";
import { useMenuContext } from "../../lib/food/MenuContext";
import MenuDisplay from "./MenuDisplay";
import MenuToolbar from "./MenuToolbar";

/**
 * A list of menus.
 *
 * @returns {React.ReactElement} The rendered list.
 */
const MenuList: FunctionComponent = () => {
  const { cursor, scope } = useMenuContext();

  const first = cursor?.startOf(scope);
  const last = cursor?.endOf(scope);

  const menus = useMenus({ first, last });

  const expectedCount = Math.ceil((last?.diff(first, "days")?.days ?? 0) * (5 / 7)); // Usually, school is closed on weekends.

  return (
    <div>
      <MenuToolbar />
      <ul className="my-4">
        {(menus ?? new Array(expectedCount).fill(undefined)).map((menu, i) => (
          <li key={menu?.date ?? i}>
            <MenuDisplay menu={menu} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
