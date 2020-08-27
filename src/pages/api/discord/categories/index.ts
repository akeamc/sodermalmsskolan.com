import withAuth from "../../../../lib/auth/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { ServerCategory } from "../../../../lib/discord/structures/server/Category";
import { ICategory } from "../../../../lib/discord/structures/shared/Category";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ICategory[]>
) => {
  const categories = await ServerCategory.fetchAll();

  return res.json(categories.map((category) => category.serialize()));
};

export default withAuth(handler);
