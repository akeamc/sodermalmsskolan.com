import useSWR from "swr";
import { IMenu, Menu, MenuQuery } from "../shared/Menu";
import ky from "ky-universal";
import moment from "moment";
import { ClientDish } from "./Dish";

export class ClientMenu extends Menu {
  dishes: ClientDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ClientDish(dish));
  }

  public static async fetchAll(): Promise<Menu[]> {
    const res = await ky.get("/api/food/menus").json<IMenu[]>();

    const menus = res
      .map((menu) => new ClientMenu(menu))
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return menus;
  }

  public static use({ limit = 10, offset = 0 }: MenuQuery) {
    return useSWR(
      `/api/food/menus?limit=${limit}&offset=${offset}`,
      async () => {
        const menus = await ClientMenu.fetchAll();

        const now = moment(new Date());
        const next = menus.findIndex((menu) =>
          now.isSameOrBefore(menu.date, "date")
        );
        const startIndex = next + offset;

        return menus.slice(startIndex, startIndex + limit);
      }
    );
  }
}
