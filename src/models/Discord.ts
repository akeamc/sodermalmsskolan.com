export class User {
  username: string;
  avatar: string | null;
  avatarURL: string | null;

  constructor(
    username: string,
    avatar: string | null,
    avatarURL: string | null
  ) {
    this.username = username;
    this.avatar = avatar;
    this.avatarURL = avatarURL;
  }
}

export class Attachment {
  id: string;
  url: string;
  /**
   * The file size of the attachment in bytes.
   */
  size: number;
  spoiler: boolean;
  height: number | null;
  width: number | null;

  constructor({
    id,
    url,
    size,
    spoiler,
    height,
    width,
  }: {
    id: string;
    url: string;
    size: number;
    spoiler: boolean;
    height: number | null;
    width: number | null;
  }) {
    this.id = id;
    this.url = url;
    this.size = size;
    this.spoiler = spoiler;
    this.height = height;
    this.width = width;
  }
}

export class Message {
  author: User;
  attachments: Attachment[];
  content: string;
  createdAt: Date;
  editedAt: Date | null;
  id: string;
  pinned: boolean;
  system: boolean;

  constructor({
    author,
    attachments,
    content,
    createdAt,
    editedAt,
    id,
    pinned,
    system,
  }: {
    author: User;
    attachments: Attachment[];
    content: string;
    createdAt: Date;
    editedAt: Date | null;
    id: string;
    pinned: boolean;
    system: boolean;
  }) {
    this.author = author;
    this.attachments = attachments;
    this.content = content;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.id = id;
    this.pinned = pinned;
    this.system = system;
  }
}
