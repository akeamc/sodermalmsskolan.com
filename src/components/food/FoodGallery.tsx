import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import React, { useEffect } from "react";
import styled from "styled-components";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { MessageAttachment } from "../../lib/discord/structures/shared/MessageAttachment";
import { SquareGrid } from "../grid/Square";
import { Spinner } from "../basic/Spinner";
import Link from "next/link";
import pxcmprs from "../../lib/pxcmprs";
import { useInView } from "react-intersection-observer";

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
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.2s ease-in-out;
  filter: grayscale(1);
  position: relative;

  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.large};
    filter: grayscale(0);
  }
`;

const Photo: React.FunctionComponent<{ attachment: MessageAttachment }> = ({
  attachment,
}) => {
  const container = (
    <PhotoContainer>
      <img
        src={
          attachment?.url
            ? pxcmprs.generateUrl({
                source: attachment?.url,
                width: 256,
                quality: 50,
              })
            : null
        }
      />
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

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setSize(size + 1);
    }
  }, [inView]);

  const attachments = data?.flat().flatMap((message) => message.attachments);

  return (
    <Grid>
      {attachments?.map((attachment, index) => (
        <Photo key={index} attachment={attachment} />
      ))}
      <div ref={ref}>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </div>
    </Grid>
  );
};
