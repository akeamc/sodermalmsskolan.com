import { Message, IDiscordAPIMessage, MessageQuery } from "../shared/Message";
import { SnowflakeUtil } from "discord.js";
import got from "got/dist/source";
import { AUTHORIZATION_HEADER } from "../../credentials";

export class ServerMessage extends Message {
  static async fetchMany(
    channel: string,
    query: MessageQuery = {}
  ): Promise<Message[]> {
    let params: { limit: number; before?: string; after?: string } = {
      limit: query.limit || 50,
    };

    if (query.before) params.before = SnowflakeUtil.generate(query.before);

    if (query.after) params.after = SnowflakeUtil.generate(query.after);

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
}
