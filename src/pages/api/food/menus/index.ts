import { NextApiRequest, NextApiResponse } from "next";
import { ServerMenu } from "../../../../lib/food/structures/server/Menu";
import { IMenu } from "../../../../lib/food/structures/shared/Menu";

export default async (_: NextApiRequest, res: NextApiResponse<IMenu[]>) => {
  const menus = await ServerMenu.fetchAll();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(menus.map((menu) => menu.serialize()));
};
