import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import React, { useState } from "react";
import styled from "styled-components";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { MessageAttachment } from "../../lib/discord/structures/shared/MessageAttachment";
import { SquareGrid } from "../grid/Square";
import { Spinner } from "../basic/Spinner";
import VisibilitySensor from "react-visibility-sensor";
import Link from "next/link";
import pxcmprs from "../../lib/pxcmprs";

const Grid = styled(SquareGrid)`
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  &::before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoContainer = styled.a`
  position: relative;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: box-shadow 0.2s ease-in-out;

  img {
    transition: all 0.2s ease-in-out;
    object-fit: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: grayscale(1);
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large};

    img {
      transform: scale(1.2);
      filter: grayscale(0);
    }
  }
`;

const Photo: React.FunctionComponent<{ attachment: MessageAttachment }> = ({
  attachment,
}) => {
  const container = (
    <PhotoContainer>
      {attachment?.url ? (
        <img
          src={pxcmprs.generateUrl({
            source: attachment?.url,
            width: 256,
            quality: 50,
          })}
        />
      ) : null}
    </PhotoContainer>
  );

  return attachment?.url ? (
    <Link href={attachment?.url} passHref>
      {container}
    </Link>
  ) : (
    container
  );
};

export const FoodGallery: React.FunctionComponent = () => {
  const { data, size, setSize } = ClientChannel.useMessagesInChannel(
    DISCORD_CHANNELS.photos.id
  );

  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  if (scrolledToBottom) {
    setSize(size + 1);
    setScrolledToBottom(false);
  }

  const attachments = data?.flat().flatMap((message) => message.attachments);

  return (
    <Grid>
      {attachments?.map((attachment, index) => (
        <Photo key={index} attachment={attachment} />
      ))}
      <VisibilitySensor onChange={setScrolledToBottom} partialVisibility>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </VisibilitySensor>
    </Grid>
  );
};
