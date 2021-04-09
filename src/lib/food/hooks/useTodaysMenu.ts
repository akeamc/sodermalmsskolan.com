import { DateTime } from "luxon";
import useTime from "../../../hooks/useTime";
import ClientMenu from "../structures/client/Menu";
import { Menu } from "../structures/shared/Menu";
import useMenus from "./useMenus";

/**
 * Return the index of the next menu based on the date (provided).
 *
 * @param {Menu[]} menus The menus to search.
 * @param {DateTime} cursor The date to search for.
 *
 * @returns {number} The index.
 */
export const getNextMenuIndex = (
  menus: Menu[],
  cursor: DateTime = DateTime.now(),
): number => {
  const startOfCursorDay = cursor.startOf("day");

  return menus.findIndex((menu) => {
    const startOfDay = menu.date.setZone(startOfCursorDay.zone).startOf("day");

    return startOfDay >= startOfCursorDay;
  });
};

/**
 * Use the *next* menu.
 *
 * @returns {ClientMenu} The next menu. `undefined` when loading or if there is no to be found.
 */
const useTodaysMenu = (): ClientMenu => {
  const { data } = useMenus();
  const now = useTime(60000);

  const index = getNextMenuIndex(data ?? [], now);

  return data?.[index];
};

export default useTodaysMenu;
