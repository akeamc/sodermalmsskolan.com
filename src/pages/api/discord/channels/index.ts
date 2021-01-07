import { NextApiHandler } from "next";
import withAuth from "../../../../lib/auth/withAuth";
import { IDiscordAPIChannel } from "../../../../lib/discord/structures/shared/Channel";
import { ServerChannel } from "../../../../lib/discord/structures/server/Channel";

const handler: NextApiHandler<IDiscordAPIChannel[]> = async (_, res) => {
  const channels = await ServerChannel.fetchAll();

  return res.json(channels.map((channel) => channel.serialize()));
};

export default withAuth(handler);
