import { Channel, IDiscordAPIChannel } from "../shared/Channel";
import { ClientMessage, MessageComponent } from "./Message";
import { Base } from "../../../../components/grid/Base";
import React from "react";
import useSWR, { SWRInfiniteResponseInterface } from "swr";
import { NormalWidth } from "../../../../components/grid/Col";
import { useSWRInfinite } from "swr";
import ky from "ky-universal";
import { IDiscordAPIMessage } from "../shared/Message";
import styled from "styled-components";
import { getAuthorizationHeader } from "../../../auth/token";
import { UseSWRResource } from "../../../common/usable";
import { IdQuery } from "../../../common/query";

const MessageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);
`;

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

export const ChannelMessages: React.FunctionComponent<UseChannelMessagesQuery> = (
  query
) => {
  const { data } = useChannelMessages(query);

  return (
    <Base>
      <NormalWidth>
        <MessageWrapper>
          {data?.flat()?.map((message, index) => (
            <MessageComponent message={message} key={index} />
          ))}
        </MessageWrapper>
      </NormalWidth>
    </Base>
  );
};
