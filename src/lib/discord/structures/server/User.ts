import { User, IDiscordAPIUser } from "../shared/User";
import got from "got";

export class ServerUser extends User {
  public static async fromAccessToken(token: string): Promise<User> {
    const serialized = await got
      .get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<IDiscordAPIUser>();

    return new User(serialized);
  }
}
