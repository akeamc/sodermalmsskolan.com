import { TextChannel } from "discord.js";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import withAuth from "../../auth/withAuth";
import { getChannelDetails } from "../constants";
import fetchTextChannel from "../utils/fetchTextChannel";

export type TextChannelHandler<T = unknown> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  channel: TextChannel
) => void | Promise<void>;

/**
 * Wrapper around API handlers that fetches a Discord Channel via the API.
 *
 * @param {TextChannelHandler} handler The inner handler.
 *
 * @returns {NextApiHandler} A handler.
 */
const withTextChannel = (
  handler: TextChannelHandler,
): NextApiHandler => async (req, res) => {
  const id = req.query.channel?.toString();

  const channel = await fetchTextChannel(id);

  const details = getChannelDetails(id);

  if (!details || details?.authenticated) {
    return withAuth((authReq, authRes) => handler(authReq, authRes, channel))(req, res);
  }

  return handler(req, res, channel);
};

export default withTextChannel;
