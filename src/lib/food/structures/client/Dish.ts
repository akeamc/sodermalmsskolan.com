import ky from "ky-universal";
import useSWR from "swr";
import { IdQuery } from "../../../common/query";
import { UseSWRResource } from "../../../common/usable";
import { Dish, IDish } from "../shared/Dish";

export class ClientDish extends Dish {
  public static async fetchAll(): Promise<ClientDish[]> {
    const res = await ky.get("/api/food/dishes").json<IDish[]>();

    return res.map((dish) => new ClientDish(dish));
  }

  public static async fetch(id: string): Promise<ClientDish> {
    if (!id) {
      return null;
    }

    const res = await ky.get(`/api/food/dishes/${id}`).json<IDish>();

    return new ClientDish(res);
  }
}

export const useDish: UseSWRResource<ClientDish, IdQuery> = ({ id }) => {
  return useSWR(`/api/food/dishes/${id}`, () => ClientDish.fetch(id), {
    revalidateOnFocus: false,
  });
};

export const useDishes: UseSWRResource<ClientDish[]> = () => {
  return useSWR(`/api/food/dishes`, ClientDish.fetchAll, {
    revalidateOnFocus: false,
  });
};
