import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import Menu from "../../lib/food/Menu";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface MenuDisplayProps {
  menu: Menu;
}

/**
 * A display for a `Menu`.
 *
 * @param {React.PropsWithChildren<MenuDisplayProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered menu.
 */
const MenuDisplay: FunctionComponent<MenuDisplayProps> = ({
  menu,
}) => (
  <div className="my-4">
    <h3 className="text-xl font-semibold">
      {menu?.date
        ? DateTime.fromISO(menu?.date).toLocaleString(DateTime.DATE_HUGE)
        : <InlineSkeleton width="8em" className="max-w-full" />}
    </h3>
    <ul>
      {(menu?.dishes ?? new Array(2).fill(undefined)).map((dish, i) => (
        <li key={dish ?? i} className="text-gray-500 font-medium">{dish ?? <InlineSkeleton className="max-w-full" width="40em" />}</li>
      ))}
    </ul>
  </div>
);

export default MenuDisplay;
