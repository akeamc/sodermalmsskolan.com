import useSWR from "swr";
import { fetchJSON } from "../fetch";
import { CollectionResponse } from "../Response";
import moment from "moment";

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
  return useSWR(`/api/food/menus?limit=${limit}&offset=${offset}`, async () => {
    const res = await fetchJSON<MenuResponse>("/api/food/menus");

    const menus = res.data.sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return -1;
      }

      if (a > b) {
        return 1;
      }

      return 0;
    });

    const now = moment(new Date());
    const next = menus.findIndex((menu) =>
      now.isSameOrBefore(menu.date, "date")
    );
    const startIndex = next + offset;

    return menus.slice(startIndex, startIndex + limit);
  });
}
