import got from "got";
import { Permissions } from "discord.js";
import { Role, IDiscordAPIRole } from "../shared/Role";
import { DISCORD_GUILD, AUTHORIZATION_HEADER } from "../../credentials";
import ServerMember from "./Member";

export default class ServerRole extends Role {
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

  public get permissions(): Permissions {
    return new Permissions(this.permissionBits);
  }

  public static async fetchBotRoles(): Promise<Role[]> {
    const [member, roles] = await Promise.all([
      ServerMember.me(),
      ServerRole.fetchAll(),
    ]);

    return member.roles.map((roleId) => roles.find((role) => role.id === roleId));
  }
}
