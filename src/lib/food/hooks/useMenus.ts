import useSWR from "swr";
import { UseSWRResource } from "../../common/usable";
import ClientMenu from "../structures/client/Menu";

/**
 * Use the menus.
 *
 * @returns {ClientMenu[]} The menus.
 */
const useMenus: UseSWRResource<ClientMenu[]> = () => useSWR("/api/food/menus", async () => {
  const menus = await ClientMenu.fetchAll();

  return menus;
});

export default useMenus;
