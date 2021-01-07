import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { HTTPError } from "got";
import { Category } from "../shared/Category";
import { ServerChannel } from "./Channel";
import withAuth from "../../../auth/withAuth";

export type ServerCategoryHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  category: ServerCategory
) => void | Promise<void>;

export class ServerCategory extends Category {
  public static async fetch(categoryId: string): Promise<ServerCategory> {
    const channels = await ServerChannel.fetchAll();

    const category = channels.find(({ id }) => id === categoryId);

    if (category) {
      return new ServerCategory(
        category.name,
        category.id,
        channels.filter((channel) => channel.parent === category.id),
      );
    }

    throw new Error(`Channel with id "${categoryId}" not found`);
  }

  public static fromCategory({ name, id, channels }: Category): ServerCategory {
    return new ServerCategory(name, id, channels);
  }

  public static async fetchAll(): Promise<ServerCategory[]> {
    const channels = await ServerChannel.fetchAll();

    return ServerCategory.fromChannels(channels).map(
      ServerCategory.fromCategory,
    );
  }

  public static wrapHandler = (
    handler: ServerCategoryHandler,
  ): NextApiHandler => withAuth(async (req, res) => {
    const id = req.query.category?.toString();

    let category;

    try {
      category = await ServerCategory.fetch(id);
    } catch (error) {
      if (error instanceof HTTPError) {
        return res.status(404).send("category not found");
      }
      throw error;
    }

    return handler(req, res, category);
  });
}
