import { ServerAuthUser } from "../../../../../lib/auth/structures/server/AuthUser";
import withAuth from "../../../../../lib/auth/withAuth";
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
    res.setHeader("Cache-Control", "s-maxage=3600");

    const votes = await ServerVote.fetchByDish(dish?.id);

    return res.json(votes.map((rating) => rating.serialize()));
  }

  if (req.method === "POST") {
    return await withAuth(async (req, res, token) => {
      const up = !!req.body?.up;
      const user = await ServerAuthUser.fromAccessToken(token);

      await ServerVote.create({
        dish: dish.id,
        author: user.discord.id,
        up: up,
      });

      return res.send(`vote accepted (${up ? "up" : "down"})`);
    })(req, res);
  }

  if (req.method === "DELETE") {
    return await withAuth(async (_, res, token) => {
      const user = await ServerAuthUser.fromAccessToken(token);

      await ServerVote.delete({
        dish: dish.id,
        author: user.discord.id,
      });

      return res.status(204).end();
    })(req, res);
  }

  res.status(405).end();
};

export default ServerDish.wrapHandler(handler);
