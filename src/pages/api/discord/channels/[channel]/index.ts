import { NextApiRequest, NextApiResponse } from "next";
import { ServerChannel } from "../../../../../lib/discord/structures/server/Channel";
import { IDiscordAPIChannel } from "../../../../../lib/discord/structures/shared/Channel";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IDiscordAPIChannel>,
  channel: ServerChannel
) => {
  return res.json(channel.serialize());
};

export default ServerChannel.wrapHandler(handler);
