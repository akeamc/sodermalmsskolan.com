import { NextApiRequest, NextApiResponse } from "next";
import { ServerDish } from "../../../../lib/food/structures/server/Dish";
import { IDish } from "../../../../lib/food/structures/shared/Dish";

export default async (_: NextApiRequest, res: NextApiResponse<IDish[]>) => {
  const dishes = await ServerDish.fetchAll();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(dishes.map((dish) => dish.serialize()));
};
