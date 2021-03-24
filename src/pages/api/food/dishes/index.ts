import { NextApiHandler } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { DishStatic } from "../../../../lib/food/structures/shared/Dish";
import { getCacheHeader } from "../../../../lib/utils/cache";

/**
 * Dishes API handler.
 *
 * @param {import("next").NextApiRequest} _ Request.
 * @param {import("next").NextApiResponse} res Response.
 *
 * @returns {void}
 */
const handler: NextApiHandler<DishStatic[]> = async (_, res) => {
  const dishes = await ServerDish.fetchAll();

  res.setHeader("Cache-Control", getCacheHeader({
    sharedMaxAge: 86400,
  }));

  return res.json(dishes.map((dish) => dish.serialize()));
};

export default handler;
