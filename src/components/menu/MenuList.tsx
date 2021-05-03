import React, { FunctionComponent } from "react";
import { AlertOctagon } from "react-feather";
import useMenus from "../../lib/food/hooks/useMenus";
import Menu from "../../lib/food/Menu";
import { useMenuContext } from "../../lib/food/MenuContext";
import MenuDisplay from "./MenuDisplay";

export interface MenuListDisplayProps {
  menus: Menu[];
  expectedCount: number;
}

/**
 * Display the glorious menus.
 *
 * @param {React.PropsWithChildren<MenuListDisplayProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered list.
 */
export const MenuListDisplay: FunctionComponent<MenuListDisplayProps> = ({
  menus,
  expectedCount,
}) => {
  if (menus?.length === 0) {
    return (
      <div className="my-4 text-gray-400 dark:text-gray-500">
        <AlertOctagon className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-700 mb-2" strokeWidth="1" />
        <p className="text-center leading-tight">Ingen meny hittades.</p>
      </div>
    );
  }

  return (
    <ul className="my-4">
      {(menus ?? new Array(expectedCount).fill(undefined)).map((menu, i) => (
        <li key={menu?.date ?? i}>
          <MenuDisplay menu={menu} />
        </li>
      ))}
    </ul>
  );
};

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
    <MenuListDisplay menus={menus} expectedCount={expectedCount} />
  );
};

export default MenuList;
