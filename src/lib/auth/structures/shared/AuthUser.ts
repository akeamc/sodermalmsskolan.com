import { IDiscordAPIUser, User } from "../../../discord/structures/shared/User";
import {
  IDiscordAPIMember,
  Member,
} from "../../../discord/structures/shared/Member";
import { Role, IDiscordAPIRole } from "../../../discord/structures/shared/Role";

export interface IAuthUser {
  discord: IDiscordAPIUser;
  member: IDiscordAPIMember | null;
  roles: IDiscordAPIRole[];
}

export class AuthUser {
  discord: User;
  member: Member | null;
  roles: Role[];

  constructor({
    discord,
    member,
    roles,
  }: {
    discord: User;
    member: Member | null;
    roles: Role[];
  }) {
    this.discord = discord;
    this.member = member;
    this.roles = roles;
  }

  public static parse({ discord, member, roles }: IAuthUser) {
    return new AuthUser({
      discord: new User(discord),
      member: member ? new Member(member) : null,
      roles: roles.map((role) => new Role(role)),
    });
  }

  public serialize(): IAuthUser {
    return {
      discord: this.discord?.serialize(),
      member: this.member?.serialize() || null,
      roles: this.roles.map((role) => role.serialize()),
    };
  }

  public get isMember(): boolean {
    return !!this.member;
  }

  public get displayName(): string {
    if (this?.member?.nickname?.length > 0) {
      return this?.member?.nickname;
    }

    return this.discord.username;
  }
}
