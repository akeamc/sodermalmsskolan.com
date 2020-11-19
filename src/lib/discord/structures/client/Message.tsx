import { Message } from "../shared/Message";
import React from "react";
import { Card, CardContent } from "../../../../components/basic/Card";
import styled from "styled-components";
import * as breakpoints from "../../../../styles/breakpoints";
import { Muted } from "../../../../components/basic/Typography";

const MessagePhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(6, 1fr);
  }

  img {
    border-radius: 5px;
  }
`;

export class ClientMessage extends Message {}

export const MessageComponent: React.FunctionComponent<{
  message: Message;
}> = ({ message }) => {
  return (
    <Card>
      <CardContent>
        <MessagePhotos>
          {message.attachments.map((attachment, index) => {
            return <img src={attachment.url} key={index} />;
          })}
        </MessagePhotos>
        <Muted>{message.content}</Muted>
      </CardContent>
    </Card>
  );
};
