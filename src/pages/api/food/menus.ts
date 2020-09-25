import { NextApiRequest, NextApiResponse } from "next";
import { MenuResponse, Menu } from "../../../lib/api/main/food/Menu";
import { RestClient } from "typed-rest-client/RestClient";

async function getMenus(): Promise<Menu[]> {
  const client = new RestClient(
    "sodexo",
    "https://potato.södermalmsskolan.com"
  );

  const res = await client.get<Menu[]>("/menu");

  return res.result;
}

export default async (
  _: NextApiRequest,
  res: NextApiResponse<MenuResponse>
) => {
  const menus = await getMenus();

  res.setHeader("Cache-Control", "s-maxage=86400");
  return res.json({
    data: menus,
    meta: {
      total: menus.length,
    },
  });
};
