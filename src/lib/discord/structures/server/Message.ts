import got from "got/dist/source";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { AUTHORIZATION_HEADER } from "../../credentials";
import {
  Message,
  IDiscordAPIMessage,
  MessageQuery,
  getParams,
} from "../shared/Message";

export type MessageQueryHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  query: MessageQuery
) => void | Promise<void>;

export class ServerMessage extends Message {
  /**
   *
   * @param channel The ID of the channel where the message is.
   * @param message The ID of the message to be fetched.
   * @param query
   */
  static async fetch(
    channel: string,
    message: string,
    query: MessageQuery = {},
  ): Promise<ServerMessage> {
    const params = getParams(query);

    const response = await got
      .get(`https://discord.com/api/channels/${channel}/messages/${message}`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
        searchParams: params,
      })
      .json<IDiscordAPIMessage>();

    return new ServerMessage(response);
  }

  static async fetchMany(
    channel: string,
    query: MessageQuery = {},
  ): Promise<ServerMessage[]> {
    const params = getParams(query);

    const response = await got
      .get(`https://discord.com/api/channels/${channel}/messages`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
        searchParams: params,
      })
      .json<IDiscordAPIMessage[]>();

    return response.map((data) => new ServerMessage(data));
  }

  public static wrapQueryHandler = (
    handler: MessageQueryHandler,
  ): NextApiHandler => (req, res) => {
    const { query } = req;

    const before = query.before?.toString();
    const after = query.after?.toString();
    const limit = (query.limit ?? 50).toString();

    if (
      !validator.isInt(limit, {
        max: 100,
        min: 1,
      })
    ) {
      return res
        .status(400)
        .send(
          "`limit` must be a positive integer less than or equal to 100.",
        );
    }

    return handler(req, res, {
      before,
      after,
      limit: validator.toInt(limit),
    });
  };
}
