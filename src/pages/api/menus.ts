import { NextApiRequest, NextApiResponse } from "next";
import { MenuResponse, Menu } from "../../lib/api/main/menu/Menu";
import Parser from "rss-parser";
import validator from "validator";

async function getMenus(offset: number, limit: number): Promise<Menu[]> {
  const parser = new Parser();
  const feedURL = `https://skolmaten.se/sodermalmsskolan-gamla-maria/rss/days/?offset=${offset}&limit=${limit}`;
  const feed = await parser.parseURL(feedURL);

  if (!feed.items || feed.items.length < 1) {
    return [];
  }

  return feed.items.map((item) => {
    return {
      dishes: item.content?.split(/<br\/>/gi) || [],
      timestamp: new Date(item.isoDate),
    };
  });
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<MenuResponse>
) => {
  const offset = (req.query.offset || 0).toString();
  const limit = (req.query.limit || 10).toString();

  if (validator.isInt(offset) && validator.isInt(limit)) {
    const menus = await getMenus(
      validator.toInt(offset),
      validator.toInt(limit)
    );

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    return res.json({
      data: menus,
      meta: {
        total: menus.length,
      },
    });
  }

  res.status(400).end("`offset` and `limit` must be integers.");
};
