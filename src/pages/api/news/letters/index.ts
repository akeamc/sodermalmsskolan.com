import { NextApiHandler } from "next";
import withAuth from "../../../../lib/auth/withAuth";
import { DISCORD_CHANNELS } from "../../../../lib/discord/constants";
import { toDiscordMessage } from "../../../../lib/discord/structures/DiscordMessage";
import fetchTextChannel from "../../../../lib/discord/utils/fetchTextChannel";
import Letter from "../../../../lib/news/structures/Letter";
import parseMessage from "../../../../lib/news/utils/parseMessage";

/**
 * API route returning all letters.
 *
 * @param {import("next").NextApiRequest} _ Request.
 * @param {import("next").NextApiResponse} res Response
 *
 * @returns {void} Nothing.
 */
const handler: NextApiHandler<Letter[]> = async (_, res) => {
  const channel = await fetchTextChannel(DISCORD_CHANNELS.news.id);

  const messages = await channel.messages.fetch({
    limit: 100,
  });

  const letters = await Promise.all(messages.map(toDiscordMessage).map(parseMessage));

  return res.json(letters);
};

export default withAuth(handler);
