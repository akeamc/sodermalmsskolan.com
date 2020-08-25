export interface IDiscordAPIRole {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions_new: string;
  managed: boolean;
  mentionable: boolean;
}

export class Role {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;

  constructor({
    id,
    name,
    color,
    hoist,
    position,
    permissions_new,
    managed,
    mentionable,
  }: IDiscordAPIRole) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.hoist = hoist;
    this.position = position;
    this.permissions = permissions_new;
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
      permissions_new: this.permissions,
      managed: this.managed,
      mentionable: this.mentionable,
    };
  }

  public get hexColor(): string {
    return `#${this.color.toString(16).padStart(6, "0")}`;
  }
}
