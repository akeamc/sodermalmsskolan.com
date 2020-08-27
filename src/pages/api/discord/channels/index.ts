import withAuth from "../../../../lib/auth/withAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { IDiscordAPIChannel } from "../../../../lib/discord/structures/shared/Channel";
import { ServerChannel } from "../../../../lib/discord/structures/server/Channel";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IDiscordAPIChannel[]>
) => {
  const channels = await ServerChannel.fetchAll();

  return res.json(channels.map((channel) => channel.serialize()));
};

export default withAuth(handler);
