import { NextApiRequest, NextApiResponse } from "next";
import { ServerChannel } from "../../../../../lib/discord/structures/server/Channel";
import {
  IDiscordAPIMessage,
  MessageQuery,
} from "../../../../../lib/discord/structures/shared/Message";
import { ServerMessage } from "../../../../../lib/discord/structures/server/Message";

const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<IDiscordAPIMessage[]>,
  channel: ServerChannel,
  query: MessageQuery
) => {
  const messages = await ServerMessage.fetchMany(channel.id, query);

  return res.json(messages.map((message) => message.serialize()));
};

export default ServerChannel.wrapHandler(async (req, res, channel) => {
  await ServerMessage.wrapQueryHandler(async (req, res, query) => {
    return await handler(req, res, channel, query);
  })(req, res);
});
