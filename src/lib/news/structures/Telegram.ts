import DiscordMessage from "../../discord/structures/DiscordMessage";

export default interface Telegram {
  timestamp: string;
  content: string;
  id: string,
}

/**
 * Convert a `DiscordMessage` to a `Telegram`.
 *
 * @param {DiscordMessage} message Message.
 *
 * @returns {Telegram} The parsed telegram.
 */
export const telegramFromMessage = ({ createdAt, content, id }: DiscordMessage): Telegram => ({
  timestamp: createdAt,
  content,
  id,
});
