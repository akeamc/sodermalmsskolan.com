import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import VisibilitySensor from "react-visibility-sensor";
import { Spinner } from "../basic/Spinner";
import { ProgressiveImage } from "../basic/ProgressiveImage";
import { LinkBlock } from "../basic/Link";
import { Emoji } from "../basic/Emoji";
import { useLocale } from "../../hooks/locale";

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
`;

const PhotoWrapper = styled.div`
  max-width: 24rem;
  margin: 0 1rem;
`;

const Photo = styled(ProgressiveImage)`
  border-radius: 8px;
  box-shadow: var(--shadow-large);
  width: 100%;
  object-fit: cover;
`;

const CaptionWrapper = styled.div`
  max-width: 48rem;
  margin-top: 1rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const FoodGallery: React.FunctionComponent = () => {
  const { data: messages, size, setSize } = ClientChannel.useMessagesInChannel(
    process.env.discordFoodChannel
  );

  const { locale } = useLocale();

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
                  <PhotoWrapper key={index}>
                    <LinkBlock href={attachment.url}>
                      <Photo src={attachment.url} loading="lazy" />
                    </LinkBlock>
                  </PhotoWrapper>
                );
              })}
            </PhotoContainer>
            <CaptionWrapper>
              <small>
                {moment(message.createdAt)
                  .locale(locale)
                  .format("HH:mm D MMMM YYYY")}{" "}
                ·{" "}
                <i>
                  <Emoji>{message.content}</Emoji>
                </i>
              </small>
            </CaptionWrapper>
          </ArtworkWrapper>
        );
      })}
      <VisibilitySensor onChange={setScrolledToBottom} partialVisibility>
        <LoadingWrapper>
          <Spinner />
        </LoadingWrapper>
      </VisibilitySensor>
    </GalleryWrapper>
  );
};
