import DiscordMessage from "../../discord/structures/DiscordMessage";
import Letter from "../structures/Letter";
import parsePdf from "./parsePdf";

/**
 * Parse a `DiscordMessage` in order to produce a `Letter`.
 *
 * @param {DiscordMessage} message The message to be parsed. Must have an attachment.
 *
 * @returns {Promise<Letter>} Hopefully a letter.
 */
const parseMessage = async (message: DiscordMessage): Promise<Letter> => {
  const attachment = message.attachments[0];

  if (!attachment) {
    return undefined;
  }

  const { url } = attachment;

  return {
    id: message.id,
    title: message.content,
    timestamp: message.createdAt,
    attachment: await parsePdf(url),
    url,
  };
};

export default parseMessage;
