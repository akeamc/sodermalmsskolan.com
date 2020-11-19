import { Message } from "../../../lib/discord/structures/shared/Message";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { randomFloatFromInterval } from "react-marquee-slider";

/**
 * A masterpiece.
 */
export class Artwork {
  publishedAt: Date;
  url: string;
  title: string;

  constructor(publishedAt: Date, url: string, title: string) {
    this.publishedAt = publishedAt;
    this.url = url;
    this.title = title;
  }

  public static fromMessage(message: Message): Artwork[] {
    return message.attachments.map(
      (attachment) =>
        new Artwork(message.createdAt, attachment.url, message.content)
    );
  }
}

const FlyingArtworkWrapper = styled.div<{ $scale: number }>`
  transform: scale(${({ $scale }) => $scale});
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};

  img {
    object-fit: cover;
  }
`;

export const FlyingArtwork: React.FunctionComponent<{
  artwork: Artwork;
}> = ({ artwork }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(randomFloatFromInterval(0.7, 1.5));
  }, []);

  return (
    <FlyingArtworkWrapper $scale={scale}>
      <Image layout="fill" src={artwork.url} />
    </FlyingArtworkWrapper>
  );
};
