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

export class GulidMember {
  displayHexColor: string;
  displayName: string;
  joinedAt: Date | null;
  nickname: string | null;

  constructor({
    displayHexColor,
    displayName,
    joinedAt,
    nickname,
  }: {
    displayHexColor: string;
    displayName: string;
    joinedAt: Date | null;
    nickname: string | null;
  }) {
    this.displayHexColor = displayHexColor;
    this.displayName = displayName;
    this.joinedAt = joinedAt;
    this.nickname = nickname;
  }
}

export class Message {
  author: User;
  attachments: Attachment[];
  content: string;
  createdAt: Date;
  editedAt: Date | null;
  id: string;
  member: GulidMember | null;
  pinned: boolean;
  system: boolean;

  constructor({
    author,
    attachments,
    content,
    createdAt,
    editedAt,
    id,
    member,
    pinned,
    system,
  }: {
    author: User;
    attachments: Attachment[];
    content: string;
    createdAt: Date;
    editedAt: Date | null;
    id: string;
    member: GulidMember | null;
    pinned: boolean;
    system: boolean;
  }) {
    this.author = author;
    this.attachments = attachments;
    this.content = content;
    this.createdAt = createdAt;
    this.editedAt = editedAt;
    this.id = id;
    this.member = member;
    this.pinned = pinned;
    this.system = system;
  }
}
