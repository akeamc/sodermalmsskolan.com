import { IDiscordAPIUser, User } from "./User";

export interface IDiscordAPIMember {
  user?: IDiscordAPIUser;
  nick?: string;
  roles: string[];
  joined_at: Date;
  premium_since?: Date;
  deaf: boolean;
  mute: boolean;
}

export class Member {
  user: User;
  nickname?: string;
  roles: string[];
  joinedAt: Date;
  premiumSince: Date;
  deaf: boolean;
  mute: boolean;

  constructor({
    user,
    nick,
    roles,
    joined_at,
    premium_since,
    deaf,
    mute,
  }: IDiscordAPIMember) {
    this.user = new User(user);
    this.nickname = nick;
    this.roles = roles;
    this.joinedAt = joined_at;
    this.premiumSince = premium_since;
    this.deaf = deaf;
    this.mute = mute;
  }

  public serialize(): IDiscordAPIMember {
    return {
      user: this.user.serialize(),
      nick: this.nickname,
      roles: this.roles,
      joined_at: this.joinedAt,
      premium_since: this.premiumSince,
      deaf: this.deaf,
      mute: this.mute,
    };
  }
}
