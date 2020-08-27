import { NextApiRequest, NextApiResponse } from "next";
import { ServerCategory } from "../../../../../lib/discord/structures/server/Category";
import { ICategory } from "../../../../../lib/discord/structures/shared/Category";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICategory>,
  category: ServerCategory
) => {
  return res.json(category.serialize());
};

export default ServerCategory.wrapHandler(handler);
