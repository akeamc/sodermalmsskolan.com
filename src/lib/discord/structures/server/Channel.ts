import { Channel, IDiscordAPIChannel } from "../shared/Channel";
import got from "got";
import {
  DISCORD_GUILD,
  AUTHORIZATION_HEADER,
  DISCORD_PUBLIC_CHANNELS,
} from "../../credentials";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../../auth/withAuth";
import { HTTPError } from "got";
import { Permissions } from "discord.js";

export interface RolePermissions {
  position: number;
  permissions: Permissions;
}

export type ServerChannelHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  channel: ServerChannel
) => void | Promise<void>;

export class ServerChannel extends Channel {
  public static async fetch(id: string): Promise<ServerChannel> {
    const data = await got
      .get(`https://discord.com/api/channels/${id}`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
      })
      .json<IDiscordAPIChannel>();

    return new ServerChannel(data);
  }

  public static async fetchAll(): Promise<ServerChannel[]> {
    const data = await got
      .get(`https://discord.com/api/guilds/${DISCORD_GUILD}/channels`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
      })
      .json<IDiscordAPIChannel[]>();

    return data.map((channel) => new ServerChannel(channel));
  }

  /**
   * Wrap an API handler to authenticate the user and verify that the channel exists. The channel ID is aquired from the `channel` path parameter.
   * @param handler
   */
  public static wrapHandler = (
    handler: ServerChannelHandler
  ): NextApiHandler => {
    return async (req, res) => {
      const id = req.query.channel?.toString();

      let channel: ServerChannel;

      try {
        channel = await ServerChannel.fetch(id);
      } catch (error) {
        if (error instanceof HTTPError) {
          return res.status(404).send("channel not found");
        } else {
          throw error;
        }
      }

      if (DISCORD_PUBLIC_CHANNELS.includes(channel.id)) {
        return await handler(req, res, channel);
      } else {
        return await withAuth(async (req, res) => {
          return await handler(req, res, channel);
        })(req, res);
      }
    };
  };
}
