import ky from "ky-universal";
import { ClientDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";

/**
 * Client-side `Menu`.
 */
export default class ClientMenu extends Menu {
  dishes: ClientDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ClientDish(dish));
  }

  public static async fetchAll(): Promise<ClientMenu[]> {
    const res = await ky.get("/api/food/menus").json<IMenu[]>();

    const menus = res
      .map((menu) => new ClientMenu(menu))
      .sort((a, b) => a.date.toMillis() - b.date.toMillis());

    return menus;
  }
}
