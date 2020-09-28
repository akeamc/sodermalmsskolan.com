import { ServerDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";
import got from "got/dist/source";
import { API_ENDPOINT } from "../../constants";

export class ServerMenu extends Menu {
  dishes: ServerDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ServerDish(dish));
  }

  public static async fetchAll(): Promise<ServerMenu[]> {
    const res = await got.get(`${API_ENDPOINT}/menu`).json<IMenu[]>();

    return res.map((menu) => new ServerMenu(menu));
  }
}
