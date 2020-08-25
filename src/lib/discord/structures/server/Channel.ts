import { Channel, IDiscordAPIChannel } from "../shared/Channel";
import got from "got";
import { DISCORD_GUILD, AUTHORIZATION_HEADER } from "../../credentials";

export class ServerChannel extends Channel {
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
}
