import got from "got";
import { API_ENDPOINT } from "../../constants";
import { Dish, IDish } from "../shared/Dish";
import { ServerRating } from "./Rating";

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

    const ratings = await ServerRating.fetchByDish(id);

    return new ServerDish({
      ...res,
      ratings: ratings.map((rating) => rating.serialize()),
    });
  }
}
