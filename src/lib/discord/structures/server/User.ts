import { DiscordUser, IDiscordAPIUser } from "../shared/User";
import got from "got";
import { DISCORD_TOKEN } from "../../credentials";

export class ServerDiscordUser extends DiscordUser {
  private static async _me(authorizationHeader: string): Promise<DiscordUser> {
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
    return ServerDiscordUser._me(`Bearer ${accessToken}`);
  }

  public static me(): Promise<DiscordUser> {
    return ServerDiscordUser._me(`Bot ${DISCORD_TOKEN}`);
  }
}
