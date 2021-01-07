import {
  ServerDish,
  ServerDishHandler,
} from "../../../../../lib/food/structures/server/Dish";
import { DishStatic } from "../../../../../lib/food/structures/shared/Dish";

const handler: ServerDishHandler<DishStatic> = async (_, res, dish) => {
  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dish.serialize());
};

export default ServerDish.wrapHandler(handler);
