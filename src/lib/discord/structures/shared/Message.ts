import {
  IDiscordAPIMessageAttachment,
  MessageAttachment,
} from "./MessageAttachment";
import { IDiscordAPIUser, User } from "./User";

export interface MessageQuery {
  before?: number;
  after?: number;
  limit?: number;
}

export interface IDiscordAPIMessage {
  id: string;
  channel_id: string;
  guild_id?: string;
  author: IDiscordAPIUser;
  // member
  content: string;
  timestamp: string;
  edited_timestamp?: string;
  tts: boolean;
  attachments: IDiscordAPIMessageAttachment[];
  pinned: boolean;
}

export class Message {
  public content: string;
  public author?: User;
  public pinned: boolean;
  public tts: boolean;
  public attachments: Map<string, MessageAttachment>;
  public createdAt: Date;
  public editedAt?: Date;

  constructor({
    id,
    channel_id,
    guild_id,
    author,
    content,
    timestamp,
    edited_timestamp,
    tts,
    attachments,
    pinned,
  }: IDiscordAPIMessage) {
    this.content = content;
    this.author = author ? new User(author) : null;
    this.pinned = pinned;
    this.tts = tts;

    this.attachments = new Map<string, MessageAttachment>();

    for (const attachment of attachments) {
      this.attachments.set(attachment.id, new MessageAttachment(attachment));
    }

    this.createdAt = new Date(timestamp);
    this.editedAt = edited_timestamp ? new Date(edited_timestamp) : null;
  }
}
