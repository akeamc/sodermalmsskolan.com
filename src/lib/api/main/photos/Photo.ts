import useSWR from "swr";
import { fetchJSON, queryString } from "../fetch";
import { FoodPhotosResponse } from "../../../discord/photos";
import { MessageQuery } from "../../../discord/structures/shared/Message";

/**
 *
 */
export function useFoodPhotos({ limit, before, after }: MessageQuery = {}) {
  let query: { limit?: number; before?: number; after?: number } = {
    limit,
  };

  before ? (query.before = before) : null;
  after ? (query.after = after) : null;

  let url = `/api/photos${queryString(query)}`;

  return useSWR(url, async (url: string) => {
    const res = await fetchJSON<FoodPhotosResponse>(url);
    return res;
  });
}
