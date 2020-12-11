import { NextApiRequest, NextApiResponse } from "next";
import { ServerChannel } from "../../../../../lib/discord/structures/server/Channel";
import {
  IDiscordAPIMessage,
  MessageQuery,
} from "../../../../../lib/discord/structures/shared/Message";
import { ServerMessage } from "../../../../../lib/discord/structures/server/Message";

export type ChannelMessagesHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  channel: ServerChannel,
  query: MessageQuery
) => void | Promise<void>;

const handler: ChannelMessagesHandler<IDiscordAPIMessage[]> = async (
  _,
  res,
  channel: ServerChannel,
  query: MessageQuery,
) => {
  const messages = await ServerMessage.fetchMany(channel.id, query);

  return res.json(messages.map((message) => message.serialize()));
};

export default ServerChannel.wrapHandler(async (oReq, oRes, channel) => {
  await ServerMessage
    .wrapQueryHandler(async (iReq, iRes, query) => handler(iReq, iRes, channel, query))(oReq, oRes);
});
