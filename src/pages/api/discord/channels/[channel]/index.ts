import {
  ServerChannel,
  ServerChannelHandler,
} from "../../../../../lib/discord/structures/server/Channel";
import { IDiscordAPIChannel } from "../../../../../lib/discord/structures/shared/Channel";

const handler: ServerChannelHandler<IDiscordAPIChannel> = async (
  _,
  res,
  channel
) => {
  return res.json(channel.serialize());
};

export default ServerChannel.wrapHandler(handler);
