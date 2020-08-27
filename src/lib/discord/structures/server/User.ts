import { User, IDiscordAPIUser } from "../shared/User";
import got from "got";
import { DISCORD_TOKEN } from "../../credentials";

export class ServerUser extends User {
  private static async _me(authorizationHeader: string): Promise<User> {
    const data = await got
      .get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: authorizationHeader,
        },
      })
      .json<IDiscordAPIUser>();

    return new User(data);
  }

  public static fromAccessToken(accessToken: string): Promise<User> {
    return ServerUser._me(`Bearer ${accessToken}`);
  }

  public static me(): Promise<User> {
    return ServerUser._me(`Bot ${DISCORD_TOKEN}`);
  }
}
