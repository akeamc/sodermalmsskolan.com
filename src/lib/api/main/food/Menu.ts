import useSWR from "swr";
import { fetchJSON } from "../fetch";
import { CollectionResponse } from "../Response";

export interface Dish {
  title: string;
  id: string;
}

export interface Menu {
  dishes: Dish[];
  date: Date;
}

export type MenuResponse = CollectionResponse<Menu>;

export interface MenuQuery {
  /**
   * How many menus to retreive (maximum).
   */
  limit?: number;

  /**
   * Offset the starting day, counting from today.
   */
  offset?: number;
}

/**
 *
 */
export function useMenus({ limit = 10, offset = 0 }: MenuQuery) {
  return useSWR(`/api/food/menus`, async (url: string) => {
    const res = await fetchJSON<MenuResponse>(url);

    return res.data.slice(offset, offset + limit);
  });
}
