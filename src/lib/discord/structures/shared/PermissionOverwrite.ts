export enum PermissionOverwriteType {
  Role = "role",
  Member = "member",
}

export interface IDiscordAPIPermissionOverwrite {
  id: string;
  type: PermissionOverwriteType;
  allow: number;
  allow_new: string;
  deny: number;
  deny_new: string;
}
