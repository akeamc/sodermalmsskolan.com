import { Member, IDiscordAPIMember } from "../shared/Member";
import { DISCORD_GUILD, AUTHORIZATION_HEADER } from "../../credentials";
import got from "got";
import { ServerDiscordUser } from "./User";

export class ServerMember extends Member {
  public static async fetch(user: string): Promise<ServerMember> {
    const data = await got
      .get(`https://discord.com/api/guilds/${DISCORD_GUILD}/members/${user}`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
      })
      .json<IDiscordAPIMember>();

    return new ServerMember(data);
  }

  public static async me(): Promise<ServerMember> {
    const user = await ServerDiscordUser.me();
    return ServerMember.fetch(user.id);
  }
}
