import { Message, IDiscordAPIMessage, MessageQuery } from "../shared/Message";
import got from "got/dist/source";
import { AUTHORIZATION_HEADER } from "../../credentials";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export type MessageQueryHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  query: MessageQuery
) => void | Promise<void>;

export class ServerMessage extends Message {
  static async fetchMany(
    channel: string,
    query: MessageQuery = {}
  ): Promise<Message[]> {
    const params: { limit: number; before?: string; after?: string } = {
      limit: query.limit || 50,
      before: query.before,
      after: query.after,
    };

    const response = await got
      .get(`https://discord.com/api/channels/${channel}/messages`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
        searchParams: params,
      })
      .json<IDiscordAPIMessage[]>();

    return response.map((data) => new Message(data));
  }

  public static wrapQueryHandler = (
    handler: MessageQueryHandler
  ): NextApiHandler => {
    return async (req, res) => {
      const { query } = req;

      const before = query.before?.toString();
      const after = query.after?.toString();
      const limit = (query.limit || 50).toString();

      if (
        !validator.isInt(limit, {
          max: 100,
          min: 1,
        })
      ) {
        return res
          .status(400)
          .send(
            "`limit` must be a positive integer less than or equal to 100."
          );
      }

      return await handler(req, res, {
        before,
        after,
        limit: validator.toInt(limit),
      });
    };
  };
}
