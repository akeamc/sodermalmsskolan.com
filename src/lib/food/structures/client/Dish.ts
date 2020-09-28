import ky from "ky-universal";
import useSWR from "swr";
import { Dish, IDish } from "../shared/Dish";

export class ClientDish extends Dish {
  public static async fetchAll() {
    const res = await ky.get("/api/food/dishes").json<IDish[]>();

    return res.map((dish) => new ClientDish(dish));
  }

  public static async fetch(id: string) {
    const res = await ky.get(`/api/food/dishes/${id}`).json<IDish>();

    return new ClientDish(res);
  }

  public static useAll() {
    return useSWR(`/api/food/dishes`, ClientDish.fetchAll);
  }

  public static use(id: string) {
    return useSWR(`/api/food/dishes/${id}`, () => ClientDish.fetch(id));
  }
}
