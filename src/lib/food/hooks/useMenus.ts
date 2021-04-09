import useSWR, { responseInterface } from "swr";
import ClientMenu from "../structures/client/Menu";

/**
 * Use the menus.
 *
 * @returns {ClientMenu[]} The menus.
 */
const useMenus = (): responseInterface<ClientMenu[], unknown> => useSWR("/api/food/menus", async () => {
  const menus = await ClientMenu.fetchAll();

  return menus;
});

export default useMenus;
