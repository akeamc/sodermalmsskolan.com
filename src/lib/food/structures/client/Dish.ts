import ky from "ky-universal";
import useSWR from "swr";
import { UseSWRResource } from "../../../common/usable";
import { Dish, DishStatic } from "../shared/Dish";

export class ClientDish extends Dish {
  public static async fetchAll(): Promise<ClientDish[]> {
    const res = await ky.get("/api/food/dishes").json<DishStatic[]>();

    return res.map((dish) => new ClientDish(dish));
  }

  public static async fetchEmissions(id: string): Promise<number> {
    if (!id) {
      return null;
    }

    const res = await ky.get(`/api/food/dishes/${id}`).json<DishStatic>();

    return res?.co2e;
  }

  public get url(): string {
    return `/mat/#${this.id}`;
  }
}

export const useDishes: UseSWRResource<ClientDish[]> = () => useSWR("/api/food/dishes", ClientDish.fetchAll, {
  revalidateOnFocus: false,
});
