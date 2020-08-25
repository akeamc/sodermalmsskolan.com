import { AuthUser } from "../shared/AuthUser";
import { ServerUser } from "../../../discord/structures/server/User";
import { ServerMember } from "../../../discord/structures/server/Member";
import { ServerRole } from "../../../discord/structures/server/Role";

export class ServerAuthUser extends AuthUser {
  public static async fromAccessToken(token: string): Promise<ServerAuthUser> {
    const discord = await ServerUser.fromAccessToken(token);
    const serverRoles = await ServerRole.fetchAll();

    const member: ServerMember = await ServerMember.fetch(discord.id).catch(
      () => null
    );
    const roles = member
      ? serverRoles.filter((role) => member?.roles?.includes(role.id))
      : [];

    return new ServerAuthUser({ discord, member, roles });
  }
}
