import { Category } from "../shared/Category";
import { ServerChannel } from "./Channel";
import { NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../auth/withAuth";
import { HTTPError } from "got";

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

  public static fromCategory({ name, id, channels }: Category) {
    return new ServerCategory(name, id, channels);
  }

  public static async fetchAll(): Promise<ServerCategory[]> {
    const channels = await ServerChannel.fetchAll();

    return ServerCategory.fromChannels(channels).map(
      ServerCategory.fromCategory
    );
  }

  public static wrapHandler = (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      category: ServerCategory
    ) => void
  ) => {
    return withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
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
