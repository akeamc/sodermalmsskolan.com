import { Message } from "../shared/Message";
import React from "react";
import { Card, CardContent } from "../../../../components/basic/Card";
import styled from "styled-components";
import * as breakpoints from "../../../../styles/breakpoints";

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

export class ClientMessage extends Message {
  public Component: React.FunctionComponent = () => {
    return (
      <Card>
        <CardContent>
          <MessagePhotos>
            {this.attachments.map((attachment, index) => {
              return <img src={attachment.url} key={index} />;
            })}
          </MessagePhotos>
          <p>{this.content}</p>
        </CardContent>
      </Card>
    );
  };
}
