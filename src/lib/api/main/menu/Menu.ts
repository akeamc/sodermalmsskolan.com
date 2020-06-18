import { CollectionResponse } from "../Response";
import useSWR from "swr";
import { fetchJSON } from "../fetch";

export interface Menu {
  dishes: string[];
  timestamp: Date;
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
  return useSWR(
    `/api/menus?limit=${limit}&offset=${offset}`,
    async (url: string) => {
      const res = await fetchJSON<MenuResponse>(url);
      return res.data;
    }
  );
}
