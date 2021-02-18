import { Snowflake, TextChannel } from "discord.js";
import client from "../client";
import { DISCORD_GUILD } from "../credentials";

/**
 * Discord utility function to fetch a `TextChannel`.
 *
 * @param {Snowflake} id The ID of the channel.
 *
 * @returns {Promise<TextChannel>} The text channel.
 */
const fetchTextChannel = async (id: Snowflake): Promise<TextChannel> => {
  await client.guilds.fetch(DISCORD_GUILD);

  const channel = await client.channels.fetch(id);

  if (!(channel instanceof TextChannel)) {
    throw new Error(`channel with ID \`${id}\` is not a text channel.`);
  }

  return channel;
};

export default fetchTextChannel;
