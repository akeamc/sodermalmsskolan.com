import { NextApiHandler } from "next";
import ServerMenu from "../../../../lib/food/structures/server/Menu";
import { IMenu } from "../../../../lib/food/structures/shared/Menu";

const handler: NextApiHandler<IMenu[]> = async (_, res) => {
  const menus = await ServerMenu.fetchAll();

  res.setHeader("Cache-Control", "s-maxage=86400");

  return res.json(menus.map((menu) => menu.serialize()));
};

export default handler;
