import { Message } from "discord.js";
import DiscordAttachment, { toDiscordAttachment } from "./DiscordAttachment";
import DiscordObject from "./DiscordObject";

export default interface DiscordMessage extends DiscordObject {
  attachments: DiscordAttachment[];
  content: string;
  createdAt: string;
}

/**
 * Convert a discord.js `Message` class into a `DiscordMessage`.
 *
 * @param {Message} message The message.
 *
 * @returns {DiscordMessage} Serializable message object.
 */
export const toDiscordMessage = ({
  id, attachments, content, createdAt,
}: Message): DiscordMessage => ({
  id,
  attachments: attachments.map(toDiscordAttachment),
  content,
  createdAt: createdAt.toISOString(),
});
