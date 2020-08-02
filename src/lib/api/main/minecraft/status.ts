import { Status, StatusResponse } from "../../../minecraft/status";
import useSWR from "swr";
import { fetchJSON } from "../fetch";

export function useMinecraftStatus() {
  return useSWR(`/api/minecraft/status`, async (url: string) => {
    const res = await fetchJSON<StatusResponse>(url);
    return res.data;
  });
}
