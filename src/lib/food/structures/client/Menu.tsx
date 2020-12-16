import useSWR from "swr";
import ky from "ky-universal";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { ClientDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";
import { UseSWRResource } from "../../../common/usable";

dayjs.extend(isSameOrBefore);

export interface UseMenuQuery {
  limit?: number;
  offset?: number;
}

export class ClientMenu extends Menu {
  dishes: ClientDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ClientDish(dish));
  }

  public static async fetchAll(): Promise<ClientMenu[]> {
    const res = await ky.get("/api/food/menus").json<IMenu[]>();

    const menus = res
      .map((menu) => new ClientMenu(menu))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return menus;
  }
}

export const useMenu: UseSWRResource<ClientMenu[], UseMenuQuery> = ({
  limit = 10,
  offset = 0,
}) => useSWR(`/api/food/menus?limit=${limit}&offset=${offset}`, async () => {
  const menus = await ClientMenu.fetchAll();

  const now = dayjs(new Date());
  const next = menus.findIndex((menu) => now.isSameOrBefore(menu.date, "date"));
  const startIndex = next + offset;

  return menus.slice(startIndex, startIndex + limit);
});
