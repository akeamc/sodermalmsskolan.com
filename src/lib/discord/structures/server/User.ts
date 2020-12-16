import got from "got";
import { DiscordUser, IDiscordAPIUser } from "../shared/User";
import { DISCORD_TOKEN } from "../../credentials";

export default class ServerDiscordUser extends DiscordUser {
  private static async me(authorizationHeader: string): Promise<DiscordUser> {
    const data = await got
      .get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: authorizationHeader,
        },
      })
      .json<IDiscordAPIUser>();

    return new DiscordUser(data);
  }

  public static fromAccessToken(accessToken: string): Promise<DiscordUser> {
    return ServerDiscordUser.me(`Bearer ${accessToken}`);
  }

  public static admin(): Promise<DiscordUser> {
    return ServerDiscordUser.me(`Bot ${DISCORD_TOKEN}`);
  }
}
