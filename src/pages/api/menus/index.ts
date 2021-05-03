import { NextApiHandler } from "next";
import Menu from "../../../lib/food/Menu";
import fetchMenus from "../../../lib/food/server/fetchMenus";
import { getCacheHeader } from "../../../lib/utils/cache";

export type MenuAPIResponse = Menu[];

/**
 * Menu API handler.
 *
 * @param {import("next").NextApiRequest} _ Request.
 * @param {import("next").NextApiResponse<MenuAPIResponse>} res Response.
 *
 * @returns {void}
 */
const handler: NextApiHandler<MenuAPIResponse> = async (_, res) => {
  const menus = await fetchMenus();

  res.setHeader("Cache-Control", getCacheHeader({
    sharedMaxAge: 604800,
    staleWhileRevalidate: 604800,
  }));

  return res.json(menus);
};

export default handler;
