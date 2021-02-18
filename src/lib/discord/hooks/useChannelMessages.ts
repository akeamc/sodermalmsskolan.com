import { Snowflake } from "discord.js";
import ky from "ky-universal";
import { SWRInfiniteResponseInterface, useSWRInfinite } from "swr";
import getAuthorizationHeader from "../../auth/header";
import DiscordMessage from "../structures/DiscordMessage";

export interface UseChannelMessagesOptions {
  channel: Snowflake;
  pageSize?: number;
}

/**
 * Use messages in a Discord channel.
 *
 * @param {UseChannelMessagesOptions} options Options.
 *
 * @returns {SWRInfiniteResponseInterface<DiscordMessage[], any>} The infinite response interface.
 */
const useChannelMessages = ({
  channel,
  pageSize = 50,
}: UseChannelMessagesOptions): SWRInfiniteResponseInterface<
DiscordMessage[],
unknown
> => useSWRInfinite(
  (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData?.length <= 0) return null;

    const base = `/api/discord/channels/${channel}/messages?limit=${pageSize}`;

    if (pageIndex === 0) return base;

    const firstMessage = previousPageData[previousPageData.length - 1];

    if (!firstMessage) return base;

    return `${base}&before=${firstMessage.id}`;
  },
  async (url: string) => ky
    .get(url, {
      headers: {
        authorization: await getAuthorizationHeader(),
      },
    })
    .json<DiscordMessage[]>(),
);

export default useChannelMessages;
