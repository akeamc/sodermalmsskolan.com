import { Serializable } from "../../../common/Serializable";

export interface IDiscordAPIRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: number;
  managed: boolean;
  mentionable: boolean;
}

export class Role implements Serializable<IDiscordAPIRole> {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissionBits: number;
  managed: boolean;
  mentionable: boolean;

  constructor({
    id,
    name,
    color,
    hoist,
    position,
    permissions,
    managed,
    mentionable,
  }: IDiscordAPIRole) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.hoist = hoist;
    this.position = position;
    this.permissionBits = permissions;
    this.managed = managed;
    this.mentionable = mentionable;
  }

  public serialize(): IDiscordAPIRole {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      hoist: this.hoist,
      position: this.position,
      permissions: this.permissionBits,
      managed: this.managed,
      mentionable: this.mentionable,
    };
  }

  public get hexColor(): string {
    return `#${this.color.toString(16).padStart(6, "0")}`;
  }
}
