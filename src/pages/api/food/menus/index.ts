import { NextApiHandler } from "next";
import ServerMenu from "../../../../lib/food/structures/server/Menu";
import { IMenu } from "../../../../lib/food/structures/shared/Menu";
import { getCacheHeader } from "../../../../lib/utils/cache";

/**
 * Menu API handler.
 *
 * @param {import("next").NextApiRequest} _ Request.
 * @param {import("next").NextApiResponse} res Response.
 *
 * @returns {void}
 */
const handler: NextApiHandler<IMenu[]> = async (_, res) => {
  const menus = await ServerMenu.fetchAll();

  res.setHeader("Cache-Control", getCacheHeader({
    sharedMaxAge: 3600,
    staleWhileRevalidate: 86400,
  }));

  return res.json(menus.map((menu) => menu.serialize()));
};

export default handler;
