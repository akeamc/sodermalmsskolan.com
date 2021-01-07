import got from "got/dist/source";
import { ServerDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";
import API_ENDPOINT from "../../endpoint";

export default class ServerMenu extends Menu {
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
