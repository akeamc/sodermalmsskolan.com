import useSWR from "swr";
import Menu from "../Menu";

/**
 * Use the menus.
 *
 * @returns {Menu[]} The menus.
 */
const useMenus = (): Menu[] => {
  const { data } = useSWR("/api/menus", (path) => fetch(path).then((res) => res.json()));

  return data;
};

export default useMenus;
