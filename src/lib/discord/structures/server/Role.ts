import { Role, IDiscordAPIRole } from "../shared/Role";
import got from "got";
import { DISCORD_GUILD, AUTHORIZATION_HEADER } from "../../credentials";

export class ServerRole extends Role {
  public static async fetchAll(): Promise<ServerRole[]> {
    const data = await got
      .get(`https://discord.com/api/guilds/${DISCORD_GUILD}/roles`, {
        headers: {
          Authorization: AUTHORIZATION_HEADER,
        },
      })
      .json<IDiscordAPIRole[]>();

    return data.map((role) => new ServerRole(role));
  }
}
