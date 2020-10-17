import { NextApiHandler } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { IDish } from "../../../../lib/food/structures/shared/Dish";

const handler: NextApiHandler<IDish> = async (req, res) => {
  const id = req.query.dish?.toString();

  const dish = await ServerDish.fetch(id);

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dish.serialize());
};

export default handler;
