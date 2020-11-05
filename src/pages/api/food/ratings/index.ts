import { NextApiHandler } from "next";
import { ServerRating } from "../../../../lib/food/structures/server/Rating";
import { RatingStatic } from "../../../../lib/food/structures/shared/Rating";

const handler: NextApiHandler<RatingStatic[]> = async (_, res) => {
  const ratings = await ServerRating.fetchAll();

  return res.json(ratings.map((rating) => rating.serialize()));
};

export default handler;
