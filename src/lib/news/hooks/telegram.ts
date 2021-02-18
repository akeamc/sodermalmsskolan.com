import useTime from "../../../hooks/useTime";
import { DISCORD_CHANNELS } from "../../discord/constants";
import useChannelMessages from "../../discord/hooks/useChannelMessages";
import Telegram, { telegramFromMessage } from "../structures/Telegram";

/**
 * Fetch the latest telegram, but only if it's not older than a specified ttl.
 *
 * @param {number} ttl The maximum age of the telegram in seconds.
 *
 * @returns {Telegram[]} Telegrams.
 */
const useFreshTelegrams = (ttl = 86400): Telegram[] => {
  const { data } = useChannelMessages({
    channel: DISCORD_CHANNELS.telegrams.id,
  });

  const now = useTime(60000);

  const messages = data?.flat()
    ?.filter((message) => new Date(message.createdAt).getTime() >= now.getTime() - ttl * 1000);

  return messages?.map(telegramFromMessage);
};

export default useFreshTelegrams;
