import got from "got";
import { API_ENDPOINT } from "../../constants";
import { Dish, IDish } from "../shared/Dish";

export class ServerDish extends Dish {
  public static async fetchAll(): Promise<ServerDish[]> {
    const res = await got.get(`${API_ENDPOINT}/dishes`).json<IDish[]>();

    return res.map((dish) => new ServerDish(dish));
  }

  /**
   * Returns detailed information about a `Dish` with a specified `id` such as carbon dioxide equivalent emissions.
   * @param id
   */
  public static async fetch(id: string): Promise<ServerDish> {
    const res = await got.get(`${API_ENDPOINT}/dishes/${id}`).json<IDish>();

    return new ServerDish(res);
  }
}
