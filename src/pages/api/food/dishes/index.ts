import { NextApiHandler } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { DishStatic } from "../../../../lib/food/structures/shared/Dish";

const handler: NextApiHandler<DishStatic[]> = async (_, res) => {
  const dishes = await ServerDish.fetchAll();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dishes.map((dish) => dish.serialize()));
};

export default handler;
