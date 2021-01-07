import { ResponsePromise } from "ky";
import ky from "ky-universal";
import useSWR from "swr";
import getAuthorizationHeader from "../../../auth/header";
import { UseSWRResource } from "../../../common/usable";
import { Vote, VoteStatic } from "../shared/Vote";

interface UseVotesQuery {
  dish: string;
}

export class ClientVote extends Vote {
  public static async sendVote(
    dish: string,
    up: boolean,
  ): Promise<ResponsePromise> {
    return ky.post(`/api/food/dishes/${dish}/votes`, {
      json: {
        up,
      },
      headers: {
        authorization: await getAuthorizationHeader(),
      },
    });
  }

  public static async deleteVote(dish: string): Promise<ResponsePromise> {
    return ky.delete(`/api/food/dishes/${dish}/votes`, {
      headers: {
        authorization: await getAuthorizationHeader(),
      },
    });
  }

  public static async fetchByDish(
    { dish }: UseVotesQuery,
    noCache = false,
  ): Promise<ClientVote[]> {
    if (!dish) {
      throw new Error("dish must be specified");
    }

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
}

export const useVotes: UseSWRResource<ClientVote[], UseVotesQuery> = (
  query,
) => useSWR(
  `/api/food/dishes/${query.dish}/votes`,
  () => ClientVote.fetchByDish(query),
  { revalidateOnFocus: false },
);
