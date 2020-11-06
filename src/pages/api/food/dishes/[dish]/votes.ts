import withAuth from "../../../../../lib/auth/withAuth";
import { ServerUser } from "../../../../../lib/discord/structures/server/User";
import {
  ServerDish,
  ServerDishHandler,
} from "../../../../../lib/food/structures/server/Dish";
import { ServerVote } from "../../../../../lib/food/structures/server/Vote";
import { VoteStatic } from "../../../../../lib/food/structures/shared/Vote";

const handler: ServerDishHandler<VoteStatic[] | string> = async (
  req,
  res,
  dish
) => {
  if (req.method === "GET") {
    return res.json(dish.votes?.map((rating) => rating.serialize()));
  }

  if (req.method === "POST") {
    return await withAuth(async (req, res, token) => {
      const positive = !!req.body?.positive;
      const user = await ServerUser.fromAccessToken(token);

      await ServerVote.create({
        dish: dish.id,
        author: user.id,
        positive,
      });

      return res.send(`vote accepted (positive: ${positive})`);
    })(req, res);
  }

  if (req.method === "DELETE") {
    return await withAuth(async (_, res, token) => {
      const user = await ServerUser.fromAccessToken(token);

      await ServerVote.delete({
        dish: dish.id,
        author: user.id,
      });

      return res.status(204).end();
    })(req, res);
  }

  res.status(405).end();
};

export default ServerDish.wrapHandler(handler);
