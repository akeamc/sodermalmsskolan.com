import { NextApiHandler } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { IDish } from "../../../../lib/food/structures/shared/Dish";

const handler: NextApiHandler<IDish[]> = async (_, res) => {
  const dishes = await ServerDish.fetchAll();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dishes.map((dish) => dish.serialize()));
};

export default handler;
