import { NextApiRequest, NextApiResponse } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { IDish } from "../../../../lib/food/structures/shared/Dish";

export default async (req: NextApiRequest, res: NextApiResponse<IDish>) => {
  const id = req.query.dish?.toString();

  const dish = await ServerDish.fetch(id);

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dish.serialize());
};
