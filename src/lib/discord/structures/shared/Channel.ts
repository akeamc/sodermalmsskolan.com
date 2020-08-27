import { IDiscordAPIUser } from "./User";
import { User } from "./User";
import { IDiscordAPIPermissionOverwrite } from "./PermissionOverwrite";

export enum ChannelType {
  GuildText = 0,
  DM = 1,
  GuildVoice = 2,
  GroupDM = 3,
  GuildCategory = 4,
  GuildNews = 5,
  GuildStore = 6,
}

export interface IDiscordAPIChannel {
  id: string;
  type: number;
  guild_id: string;
  position?: number;
  permission_overwrites?: IDiscordAPIPermissionOverwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: IDiscordAPIUser[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: Date;
}

export class Channel {
  id: string;
  type: ChannelType;
  guild: string;
  position?: number;
  permissionOverwrites: IDiscordAPIPermissionOverwrite[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  lastMessage: string;
  bitrate?: number;
  userLimit?: number;
  rateLimit?: number;
  recipients?: User[];
  icon?: string;
  owner?: string;
  application?: string;
  parent?: string;
  lastPin: Date;

  constructor({
    id,
    type,
    guild_id,
    position,
    permission_overwrites,
    name,
    topic,
    nsfw,
    last_message_id,
    bitrate,
    user_limit,
    rate_limit_per_user,
    recipients,
    icon,
    owner_id,
    application_id,
    parent_id,
    last_pin_timestamp,
  }: IDiscordAPIChannel) {
    this.id = id;
    this.type = type;
    this.guild = guild_id;
    this.position = position;
    this.permissionOverwrites = permission_overwrites;
    this.name = name;
    this.topic = topic;
    this.nsfw = nsfw;
    this.lastMessage = last_message_id;
    this.bitrate = bitrate;
    this.userLimit = user_limit;
    this.rateLimit = rate_limit_per_user;
    this.recipients = recipients?.map((recipient) => new User(recipient));
    this.icon = icon;
    this.owner = owner_id;
    this.application = application_id;
    this.parent = parent_id;
    this.lastPin = last_pin_timestamp;
  }

  public serialize(): IDiscordAPIChannel {
    return {
      id: this.id,
      type: this.type,
      guild_id: this.guild,
      position: this.position,
      permission_overwrites: this.permissionOverwrites,
      name: this.name,
      topic: this.topic,
      nsfw: this.nsfw,
      last_message_id: this.lastMessage,
      bitrate: this.bitrate,
      user_limit: this.userLimit,
      rate_limit_per_user: this.rateLimit,
      recipients: this.recipients?.map((user) => user.serialize()),
      icon: this.icon,
      owner_id: this.owner,
      application_id: this.application,
      parent_id: this.parent,
      last_pin_timestamp: this.lastPin,
    };
  }
}
