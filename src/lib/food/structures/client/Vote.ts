import { ResponsePromise } from "ky";
import ky from "ky-universal";
import useSWR, { responseInterface } from "swr";
import { Vote, VoteStatic } from "../shared/Vote";

export class ClientVote extends Vote {
  public static async sendVote(
    dish: string,
    up: boolean
  ): Promise<ResponsePromise> {
    return ky.post(`/api/food/dishes/${dish}/votes`, {
      json: {
        up,
      },
    });
  }

  public static async deleteVote(dish: string): Promise<ResponsePromise> {
    return ky.delete(`/api/food/dishes/${dish}/votes`);
  }

  public static async fetchByDish(
    dish: string,
    noCache = false
  ): Promise<ClientVote[]> {
    const res = await ky
      .get(`/api/food/dishes/${dish}/votes`, {
        searchParams: noCache
          ? {
              _vercel_no_cache: 1,
            }
          : null,
      })
      .json<VoteStatic[]>();

    return res.map((vote) => new ClientVote(vote));
  }

  public static useByDish(
    dish: string
  ): responseInterface<ClientVote[], unknown> {
    return useSWR(
      `/api/food/dishes/${dish}/votes`,
      () => ClientVote.fetchByDish(dish),
      { revalidateOnFocus: false }
    );
  }
}
