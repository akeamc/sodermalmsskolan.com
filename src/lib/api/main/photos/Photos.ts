import { CollectionResponse } from "../Response";
import useSWR from "swr";
import { fetchJSON } from "../fetch";
import { FoodPhotosResponse } from "../../../discord/photos";
import { MessageQuery } from "../../../discord/structures/Message";

/**
 *
 */
export function useFoodPhotos({
  limit = 50,
  before,
  after,
}: MessageQuery = {}) {
  return useSWR(
    `/api/photos?limit=${limit}${before ? "&before=" + before.getTime() : ""}${
      after ? "&after=" + after.getTime() : ""
    }`,
    async (url: string) => {
      const res = await fetchJSON<FoodPhotosResponse>(url);
      return res.data;
    }
  );
}
