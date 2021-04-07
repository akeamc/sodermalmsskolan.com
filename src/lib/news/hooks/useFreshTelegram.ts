import { DateTime } from "luxon";
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
  const exp = now.toMillis() - ttl * 1000;

  const messages = data?.flat()
    ?.filter((message) => DateTime.fromISO(message.createdAt).toMillis() >= exp);

  return messages?.map(telegramFromMessage);
};

export default useFreshTelegrams;
