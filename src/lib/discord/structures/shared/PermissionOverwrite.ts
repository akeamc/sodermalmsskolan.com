import { Permissions } from "discord.js";

export interface IDiscordAPIPermissionOverwrite {
  id: string;
  type: string;
  allow: number;
  allow_new: string;
  deny: number;
  deny_new: string;
}

export class PermissionOverwrite {
  id: string;
  type: string;
  allow: Permissions;
  deny: Permissions;

  constructor({ id, type, allow, deny }: IDiscordAPIPermissionOverwrite) {
    this.id = id;
    this.type = type;
    this.allow = new Permissions(allow);
    this.deny = new Permissions(deny);
  }
}
