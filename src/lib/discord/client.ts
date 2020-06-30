import Discord from "discord.js";

export const initializeClient = (
  options?: Discord.ClientOptions
): Promise<Discord.Client> =>
  new Promise((resolve) => {
    const { DISCORD_TOKEN } = process.env;

    if (!DISCORD_TOKEN) {
      throw new Error("No DISCORD_TOKEN in environment variables.");
    }

    const client = new Discord.Client(options);

    client.login(DISCORD_TOKEN);

    client.once("ready", () => resolve(client));
  });
