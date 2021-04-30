import { DateTime } from "luxon";
import React, { FunctionComponent, useEffect, useState } from "react";
import useMenus from "../../lib/food/hooks/useMenus";
import MenuDisplay from "./MenuDisplay";

/**
 * A list of menus.
 *
 * @returns {React.ReactElement} The rendered list.
 */
const MenuList: FunctionComponent = () => {
  const [cursor, setCursor] = useState<DateTime>();

  useEffect(() => {
    setCursor(DateTime.now());
  }, []);

  const first = cursor?.startOf("week");
  const last = cursor?.endOf("week");

  const menus = useMenus({ first, last });

  const expectedCount = Math.ceil(last?.diff(first, "days")?.days ?? 0);

  return (
    <ul>
      {(menus ?? new Array(expectedCount).fill(undefined)).map((menu, i) => (
        <li key={menu.date ?? i}>
          <MenuDisplay menu={menu} />
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
