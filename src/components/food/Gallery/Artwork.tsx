import { Message } from "../../../lib/discord/structures/shared/Message";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import * as breakpoints from "../../../styles/breakpoints";

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

  public getScale(min: number, max: number): number {
    const random = (this.publishedAt.getTime() % 1000) / 1000;

    return random * (max - min) + min;
  }
}

const FlyingArtworkWrapper = styled.div<{ $scale: number }>`
  transform: scale(${({ $scale }) => $scale});
  width: ${({ $scale }) => `calc(${$scale} * 2rem)`};
  height: ${({ $scale }) => `calc(${$scale} * 2rem)`};
  overflow: hidden;
  position: relative;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.skeleton.base};
  box-shadow: ${({ theme }) => theme.shadows.small};

  @media (min-width: ${breakpoints.medium}) {
    width: ${({ $scale }) => `calc(${$scale} * 5rem)`};
    height: ${({ $scale }) => `calc(${$scale} * 5rem)`};
  }

  img {
    object-fit: cover;
  }
`;

export const FlyingArtwork: React.FunctionComponent<{
  artwork: Artwork;
}> = ({ artwork }) => {
  return (
    <FlyingArtworkWrapper $scale={artwork.getScale(1, 1.2)}>
      <Image layout="fill" src={artwork.url} draggable="false" />
    </FlyingArtworkWrapper>
  );
};
