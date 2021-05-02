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
  const first = cursor?.startOf("week");
  const last = cursor?.endOf("week");

  useEffect(() => {
    setCursor(DateTime.now());
  }, []);

  const menus = useMenus({ first, last });

  const expectedCount = Math.ceil((last?.diff(first, "days")?.days ?? 0) * (5 / 7)); // Usually, school is closed on weekends.

  return (
    <ul>
      {(menus ?? new Array(expectedCount).fill(undefined)).map((menu, i) => (
        <li key={menu?.date ?? i}>
          <MenuDisplay menu={menu} />
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
