import { IDiscordAPIChannel, Channel, ChannelType } from "./Channel";

export interface ICategory {
  name: string;
  id: string;
  channels: IDiscordAPIChannel[];
}

export class Category {
  constructor(
    public name: string,
    public id: string,
    public channels: Channel[]
  ) {}

  public static parse({ name, id, channels }: ICategory): Category {
    return new Category(
      name,
      id,
      channels.map((channel) => new Channel(channel))
    );
  }

  public serialize(): ICategory {
    return {
      name: this.name,
      id: this.id,
      channels: this.channels.map((channel) => channel.serialize()),
    };
  }

  public static fromChannels(channels: Channel[]): Category[] {
    const categories = channels.filter(
      (channel) => channel.type == ChannelType.GuildCategory
    );

    return categories.map(
      ({ name, id }) =>
        new Category(
          name,
          id,
          channels.filter((channel) => channel.parent == id)
        )
    );
  }
}
