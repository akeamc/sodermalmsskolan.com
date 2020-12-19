import useSWR from "swr";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { SimpleSWRResponse, UseSWRResource } from "../../common/usable";
import ClientMenu from "../structures/client/Menu";

dayjs.extend(isSameOrBefore);

export interface UseMenuQuery {
  limit?: number;
  offset?: number;
}

export const useMenu: UseSWRResource<ClientMenu[], UseMenuQuery> = ({
  limit = 10,
  offset = 0,
}) => useSWR(`/api/food/menus?limit=${limit}&offset=${offset}`, async () => {
  const menus = await ClientMenu.fetchAll();

  const now = dayjs(new Date());
  const next = menus.findIndex((menu) => now.isSameOrBefore(menu.date, "date"));
  const startIndex = next + offset;

  return menus.slice(startIndex, startIndex + limit);
});

/**
 * Use today's menu.
 */
export const useDayMenu = (): SimpleSWRResponse<ClientMenu> => {
  const { data } = useMenu({
    limit: 1,
  });

  return {
    data: data?.[0],
    loading: !data,
  };
};
