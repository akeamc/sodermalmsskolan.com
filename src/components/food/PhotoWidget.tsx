import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { DISCORD_CHANNELS } from "../../lib/discord/constants";
import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import { MessageAttachment } from "../../lib/discord/structures/shared/MessageAttachment";
import * as breakpoints from "../../styles/breakpoints";
import Image from "next/image";
import { SquareGrid } from "../grid/Square";

const Grid = styled(SquareGrid)<{ $width: number; $height: number }>`
  grid-template-columns: repeat(${({ $height }) => $height}, 1fr);
  grid-template-rows: repeat(${({ $width }) => $width}, 1fr);
  width: 100%;
  grid-gap: 3px;

  @media (min-width: ${breakpoints.small}) {
    grid-gap: 4px;
  }

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

const Cell = styled.a`
  background-color: ${({ theme }) => theme.colors.skeleton.base};
  border-radius: 4px;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: opacity 0.1s ease, filter 0.1s ease;
  position: relative;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.2s ease-in-out;
  }

  &:hover {
    opacity: 1;
    filter: grayscale(0%);

    img {
      transform: scale(1.2);
    }
  }
`;

const Photo: React.FunctionComponent<{
  attachment?: MessageAttachment;
}> = ({ attachment }) => {
  if (attachment) {
    return (
      <Link href={attachment.url} passHref>
        <Cell>
          <Image src={attachment.url} layout="fill" />
        </Cell>
      </Link>
    );
  } else {
    return <Cell />;
  }
};

export const PhotoWidget: React.FunctionComponent<{
  width?: number;
  height?: number;
}> = ({ width = 8, height = 8 }) => {
  const { data } = ClientChannel.useMessagesInChannel(
    DISCORD_CHANNELS.photos.id,
    width * height
  );

  const messages = data?.flat();

  const attachments =
    messages
      ?.flatMap((message) => message.attachments)
      .slice(0, width * height) || new Array(width * height).fill(null);

  return (
    <Grid $width={width} $height={height}>
      {attachments?.map((attachment, index) => {
        return <Photo attachment={attachment} key={index} />;
      })}
    </Grid>
  );
};
