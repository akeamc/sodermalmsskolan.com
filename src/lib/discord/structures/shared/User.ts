export interface IDiscordAPIUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export class User {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa?: boolean;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premiumType?: number;
  publicFlags?: number;

  constructor({
    id,
    username,
    discriminator,
    avatar,
    bot,
    system,
    mfa_enabled,
    locale,
    verified,
    email,
    flags,
    premium_type,
    public_flags,
  }: IDiscordAPIUser) {
    this.id = id;
    this.username = username;
    this.discriminator = discriminator;
    this.avatar = avatar;
    this.bot = bot;
    this.system = system;
    this.mfa = mfa_enabled;
    this.locale = locale;
    this.verified = verified;
    this.email = email;
    this.flags = flags;
    this.premiumType = premium_type;
    this.publicFlags = public_flags;
  }

  public get avatarURL() {
    return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.png`;
  }

  public serialize(): IDiscordAPIUser {
    return {
      id: this.id,
      username: this.username,
      discriminator: this.discriminator,
      avatar: this.avatar,
      bot: this.bot,
      system: this.system,
      mfa_enabled: this.mfa,
      locale: this.locale,
      verified: this.verified,
      email: this.email,
      flags: this.flags,
      premium_type: this.premiumType,
      public_flags: this.publicFlags,
    };
  }
}
