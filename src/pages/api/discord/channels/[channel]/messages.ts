import validator from "validator";
import DiscordMessage, { toDiscordMessage } from "../../../../../lib/discord/structures/DiscordMessage";
import withTextChannel, { TextChannelHandler } from "../../../../../lib/discord/wrappers/withTextChannel";

/**
 * Discord channel messages endpoint.
 *
 * @param {import("next").NextApiRequest} req Request.
 * @param {import("next").NextApiResponse} res Response.
 * @param {import("discord.js").TextChannel} channel Input text channel.
 *
 * @returns {void} Nothing.
 */
const handler: TextChannelHandler<DiscordMessage[] | string> = async (
  req,
  res,
  channel,
) => {
  const { query } = req;

  const before = query.before?.toString();
  const after = query.after?.toString();
  const limit = (query.limit ?? 50).toString();

  if (
    !validator.isInt(limit, {
      max: 100,
      min: 1,
    })
  ) {
    return res
      .status(400)
      .send(
        "`limit` must be a positive integer less than or equal to 100.",
      );
  }

  const messages = await channel.messages.fetch({
    before,
    after,
    limit: parseInt(limit, 10),
  });

  return res.json(messages.map(toDiscordMessage));
};

export default withTextChannel(handler);
