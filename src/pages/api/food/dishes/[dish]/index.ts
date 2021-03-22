import {
  ServerDish,
  ServerDishHandler,
} from "../../../../../lib/food/structures/server/Dish";
import { DishStatic } from "../../../../../lib/food/structures/shared/Dish";
import { getCacheHeader } from "../../../../../lib/utils/cache";

/**
 * Single dish API handler.
 *
 * @param {import("next").NextApiRequest} _ Request.
 * @param {import("next").NextApiResponse} res Response.
 * @param {ServerDish} dish Dish.
 *
 * @returns {void}
 */
const handler: ServerDishHandler<DishStatic> = async (_, res, dish) => {
  res.setHeader("Cache-Control", getCacheHeader({
    maxAge: 86400,
  }));

  return res.json(dish.serialize());
};

export default ServerDish.wrapHandler(handler);
