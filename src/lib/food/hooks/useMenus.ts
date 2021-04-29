import { DateTime } from "luxon";
import useSWR from "swr";
import Menu from "../Menu";

export interface MenuFilterQuery {
  first?: DateTime;
  last?: DateTime;
}

/**
 * Filter menus.
 *
 * @param {Menu[]} data Input data. Must be ordered with the latest date first.
 * @param {MenuFilterQuery} query Query.
 *
 * @returns {Menu[]} Filtered menu.
 */
export const filterMenus = (data?: Menu[], { first, last }: MenuFilterQuery = {}): Menu[] => {
  if (!data) {
    return undefined;
  }

  // `data` is reversed, with the last element first. Bear with me.
  const start = last ? Math.max(data
    .findIndex(({ date }) => DateTime.fromISO(date) <= last), 0) : 0;

  /**
   * End of the sliced array. `data` is read from `start` in order to reduce duplicates.
   * In other words, the "actual" end is `sliceEnd + start` as long as `sliceEnd` isn't -1 or
   * undefined.
   */
  const sliceEnd = first ? data
    .slice(start)
    .findIndex(({ date }) => DateTime.fromISO(date) < first) : undefined;

  // If `last` is undefined, `sliceEnd` is too. Moreover, `sliceEnd` is -1 if no value was found.
  const end = sliceEnd >= 0 ? sliceEnd + start : undefined;

  return data.slice(start, end);
};

/**
 * Use the menus.
 *
 * @param {MenuFilterQuery} query The query.
 *
 * @returns {Menu[]} The menus.
 */
const useMenus = (query: MenuFilterQuery = {}): Menu[] => {
  const { data } = useSWR<Menu[]>("/api/menus", (path) => fetch(path).then((res) => res.json()));

  return filterMenus(data, query);
};

export default useMenus;
