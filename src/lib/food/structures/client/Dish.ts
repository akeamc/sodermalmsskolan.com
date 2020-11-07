import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { Dish, IDish } from "../shared/Dish";

export class ClientDish extends Dish {
  public static async fetchAll(): Promise<ClientDish[]> {
    const res = await ky.get("/api/food/dishes").json<IDish[]>();

    return res.map((dish) => new ClientDish(dish));
  }

  public static async fetch(id: string): Promise<ClientDish> {
    const res = await ky.get(`/api/food/dishes/${id}`).json<IDish>();

    return new ClientDish(res);
  }

  public static useAll(): responseInterface<ClientDish[], unknown> {
    return useSWR(`/api/food/dishes`, ClientDish.fetchAll, {
      revalidateOnFocus: false,
    });
  }

  public static use(id: string): responseInterface<ClientDish, unknown> {
    return useSWR(`/api/food/dishes/${id}`, () => ClientDish.fetch(id), {
      revalidateOnFocus: false,
    });
  }
}
