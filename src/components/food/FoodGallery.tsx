import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import VisibilitySensor from "react-visibility-sensor";

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 4rem;
`;

const ArtworkWrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 -1rem;
`;

const Photo = styled.img`
  border-radius: 5px;
  box-shadow: var(--shadow-large);
  max-width: 24rem;
  margin: 0 1rem;
`;

const CaptionWrapper = styled.div`
  max-width: 48rem;
  margin-top: 1rem;
`;

const LoadingText = styled.div`
  text-align: center;
`;

export const FoodGallery: React.FunctionComponent = () => {
  const { data: messages, size, setSize } = ClientChannel.useMessagesInChannel(
    process.env.discordFoodChannel
  );

  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  if (scrolledToBottom) {
    setSize(size + 1);
    setScrolledToBottom(false);
  }

  return (
    <GalleryWrapper>
      {messages?.flat()?.map((message, index) => {
        return (
          <ArtworkWrapper key={index}>
            <PhotoContainer>
              {message.attachments.map((attachment, index) => {
                return (
                  <Photo src={attachment.url} key={index} loading="lazy" />
                );
              })}
            </PhotoContainer>
            <CaptionWrapper>
              <small>
                {moment(message.createdAt)
                  .locale("sv")
                  .format("HH:mm D MMMM YYYY")}{" "}
                · <i>{message.content}</i>
              </small>
            </CaptionWrapper>
          </ArtworkWrapper>
        );
      })}
      <VisibilitySensor onChange={setScrolledToBottom} partialVisibility>
        <LoadingText>
          <small>Du kan se alla bilder på vår Discordserver!</small>
        </LoadingText>
      </VisibilitySensor>
    </GalleryWrapper>
  );
};
