import { Channel, IDiscordAPIChannel } from "../shared/Channel";
import { ClientMessage } from "./Message";
import { Base } from "../../../../components/grid/Row";
import React from "react";
import useSWR from "swr";
import { NormalWidth } from "../../../../components/grid/Col";
import { useSWRInfinite } from "swr";
import ky from "ky-universal";
import { IDiscordAPIMessage } from "../shared/Message";
import styled from "styled-components";

const MessageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);
`;

export class ClientChannel extends Channel {
  public static useChannel(id: string) {
    return useSWR(`/api/discord/channels/${id}`, async (url: string) => {
      const data = await ky.get(url).json<IDiscordAPIChannel>();

      return new ClientChannel(data);
    });
  }

  public static useMessagesInChannel(channel: string, pageSize: number = 50) {
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
        const data = await ky.get(url).json<IDiscordAPIMessage[]>();

        return data.map((messageData) => new ClientMessage(messageData));
      }
    );
  }

  public useMessages(pageSize: number = 50) {
    return ClientChannel.useMessagesInChannel(this.id, pageSize);
  }

  public MessageGrid: React.FunctionComponent = () => {
    const { data: messages } = this.useMessages();

    return (
      <Base>
        <NormalWidth>
          <MessageWrapper>
            {messages?.flat()?.map((message, index) => (
              <message.Component key={index} />
            ))}
          </MessageWrapper>
        </NormalWidth>
      </Base>
    );
  };
}
