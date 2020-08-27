import { IDiscordAPIEmoji } from "./Emoji";

export interface IDiscordAPIMessageReaction {
  count: number;
  me: boolean;
  emoji: IDiscordAPIEmoji;
}
