import { Channel, IDiscordAPIChannel } from "../shared/Channel";
import { ClientMessage } from "./Message";
import useSWR, { SWRInfiniteResponseInterface } from "swr";
import { useSWRInfinite } from "swr";
import ky from "ky-universal";
import { IDiscordAPIMessage } from "../shared/Message";
import { getAuthorizationHeader } from "../../../auth/token";
import { UseSWRResource } from "../../../common/usable";
import { IdQuery } from "../../../common/query";

export interface UseChannelMessagesQuery {
  channel: string;
  pageSize?: number;
}

export class ClientChannel extends Channel {}

export const useChannel: UseSWRResource<ClientChannel, IdQuery> = ({ id }) => {
  return useSWR(`/api/discord/channels/${id}`, async (url: string) => {
    const data = await ky.get(url).json<IDiscordAPIChannel>();

    return new ClientChannel(data);
  });
};

export const useChannelMessages = ({
  channel,
  pageSize = 50,
}: UseChannelMessagesQuery): SWRInfiniteResponseInterface<
  ClientMessage[],
  unknown
> => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && previousPageData?.length <= 0) return null;

      const base = `/api/discord/channels/${channel}/messages?limit=${pageSize}`;

      if (pageIndex === 0) return base;

      const firstMessage = previousPageData[previousPageData.length - 1];

      if (!firstMessage) return base;

      return `${base}&before=${firstMessage.id}`;
    },
    async (url: string) => {
      const data = await ky
        .get(url, {
          headers: {
            authorization: await getAuthorizationHeader(),
          },
        })
        .json<IDiscordAPIMessage[]>();

      return data.map((messageData) => new ClientMessage(messageData));
    }
  );
};
