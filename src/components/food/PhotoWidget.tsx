import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { ClientChannel } from "../../lib/discord/structures/client/Channel";
import { MessageAttachment } from "../../lib/discord/structures/shared/MessageAttachment";
import pxcmprs from "../../lib/utils/pxcmprs";

const Grid = styled.div<{ $width: number; $height: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $height }) => $height}, 1fr);
  grid-template-rows: repeat(${({ $width }) => $width}, 1fr);
  width: 100%;
  grid-gap: 0.25rem;

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

const Cell = styled.a<{
  $background: string;
}>`
  background-color: ${({ theme }) => theme.colors.skeleton.base};
  background-image: url("${({ $background }) => $background}");
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  filter: grayscale(100%);
  opacity: 0.5;
  transition: opacity 0.1s ease, filter 0.1s ease;

  &:hover {
    opacity: 1;
    filter: grayscale(0%);
  }
`;

const Photo: React.FunctionComponent<{
  attachment?: MessageAttachment;
  resolutionX: number;
}> = ({ attachment, resolutionX }) => {
  if (attachment) {
    const url = pxcmprs.generateUrl({
      source: attachment.url,
      width: resolutionX,
      quality: 0,
    });

    return (
      <Link href={attachment.url} passHref>
        <Cell $background={url} />
      </Link>
    );
  } else {
    return <Cell $background="" />;
  }
};

export const PhotoWidget: React.FunctionComponent<{
  width?: number;
  height?: number;
}> = ({ width = 8, height = 8 }) => {
  const { data } = ClientChannel.useMessagesInChannel(
    process.env.discordFoodChannel,
    width * height
  );

  const messages = data?.flat();

  const attachments =
    messages
      ?.flatMap((message) => message.attachments)
      .slice(0, width * height) || new Array(width * height).fill(null);

  const resolutionX = Math.floor(512 / width);

  return (
    <Grid $width={width} $height={height}>
      {attachments?.map((attachment, index) => {
        return (
          <Photo
            attachment={attachment}
            key={index}
            resolutionX={resolutionX}
          />
        );
      })}
    </Grid>
  );
};
