import { Category } from "../shared/Category";
import { ServerChannel } from "./Channel";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../auth/withAuth";
import { HTTPError } from "got";

export type ServerCategoryHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  category: ServerCategory
) => void | Promise<void>;

export class ServerCategory extends Category {
  public static async fetch(id: string): Promise<ServerCategory> {
    const channels = await ServerChannel.fetchAll();

    for (const parent of channels) {
      if (parent.id == id) {
        return new ServerCategory(
          parent.name,
          parent.id,
          channels.filter((channel) => channel.parent == parent.id)
        );
      }
    }

    throw new Error(`Channel with id "${id}" not found`);
  }

  public static fromCategory({ name, id, channels }: Category): ServerCategory {
    return new ServerCategory(name, id, channels);
  }

  public static async fetchAll(): Promise<ServerCategory[]> {
    const channels = await ServerChannel.fetchAll();

    return ServerCategory.fromChannels(channels).map(
      ServerCategory.fromCategory
    );
  }

  public static wrapHandler = (
    handler: ServerCategoryHandler
  ): NextApiHandler => {
    return withAuth(async (req, res) => {
      const id = req.query.category?.toString();

      let category;

      try {
        category = await ServerCategory.fetch(id);
      } catch (error) {
        if (error instanceof HTTPError) {
          return res.status(404).send("category not found");
        } else {
          throw error;
        }
      }

      return await handler(req, res, category);
    });
  };
}
