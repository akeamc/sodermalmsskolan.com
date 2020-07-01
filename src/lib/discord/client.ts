import { RestClient } from "typed-rest-client/RestClient";

export const getClient = (): RestClient => {
  const { DISCORD_TOKEN } = process.env;

  if (!DISCORD_TOKEN) {
    throw new Error("No DISCORD_TOKEN in environment variables.");
  }

  return new RestClient("discord-bot-api", "https://discord.com", [], {
    headers: {
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
  });
};
