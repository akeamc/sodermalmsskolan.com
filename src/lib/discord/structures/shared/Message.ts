import {
  IDiscordAPIMessageAttachment,
  MessageAttachment,
} from "./MessageAttachment";
import { IDiscordAPIUser, User } from "./User";
import { Member, IDiscordAPIMember } from "./Member";
import { IDiscordAPIMessageReaction } from "./MessageReaction";
import { Serializable } from "../../../common/Serializable";

/**
 * Options for fetching messages.
 */
export interface MessageQuery {
  /**
   * Discord `Snowflake`. Returns messages sent before the specified snowflake timestamp.
   */
  before?: string;

  /**
   * Discord `Snowflake`. Returns messages sent after the specified snowflake timestamp.
   */
  after?: string;

  /**
   * The limit of how many messages to fetch. According to Discord's API, it must be an integer larger than 0 and at most 100.
   */
  limit?: number;
}

export interface IDiscordAPIMessage {
  id: string;
  channel_id: string;
  guild_id?: string;
  author: IDiscordAPIUser;
  member?: IDiscordAPIMember;
  content: string;
  timestamp: Date;
  edited_timestamp?: Date;
  tts: boolean;
  attachments: IDiscordAPIMessageAttachment[];
  pinned: boolean;
  reactions?: IDiscordAPIMessageReaction[];
}

export class Message implements Serializable<IDiscordAPIMessage> {
  id: string;
  channel: string;
  guild?: string;
  author: User;
  member?: Member;
  content: string;
  pinned: boolean;
  tts: boolean;
  attachments: MessageAttachment[];
  createdAt: Date;
  editedAt?: Date;
  reactions?: IDiscordAPIMessageReaction[];

  constructor({
    id,
    channel_id,
    guild_id,
    author,
    member,
    content,
    timestamp,
    edited_timestamp,
    tts,
    attachments,
    pinned,
    reactions,
  }: IDiscordAPIMessage) {
    this.id = id;
    this.channel = channel_id;
    this.guild = guild_id;
    this.content = content;
    this.author = new User(author);
    this.member = member ? new Member(member) : null;
    this.pinned = pinned;
    this.tts = tts;
    this.attachments = attachments.map(
      (attachment) => new MessageAttachment(attachment)
    );
    this.createdAt = timestamp;
    this.editedAt = edited_timestamp;
    this.reactions = reactions;
  }

  public serialize(): IDiscordAPIMessage {
    return {
      id: this.id,
      channel_id: this.channel,
      guild_id: this.guild,
      content: this.content,
      author: this.author.serialize(),
      member: this.member?.serialize(),
      pinned: this.pinned,
      tts: this.tts,
      attachments: this.attachments.map((attachment) => attachment.serialize()),
      timestamp: this.createdAt,
      edited_timestamp: this.editedAt,
      reactions: this.reactions,
    };
  }
}
