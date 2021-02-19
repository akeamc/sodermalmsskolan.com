import { MessageAttachment } from "discord.js";
import DiscordObject from "./DiscordObject";

export default interface DiscordAttachment extends DiscordObject {
  url: string;
}

/**
 * Convert a discord.js `MessageAttachment` to a `DiscordAttachment`.
 *
 * @param {MessageAttachment} attachment The attachment.
 *
 * @returns {DiscordAttachment} Superior `DiscordAttachment`.
 */
export const toDiscordAttachment = ({ id, url }: MessageAttachment): DiscordAttachment => ({
  id,
  url,
});
