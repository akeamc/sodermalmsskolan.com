import { ClientChannel } from "../../../lib/discord/structures/client/Channel";
import React, { useState } from "react";
import styled from "styled-components";
import { DISCORD_CHANNELS } from "../../../lib/discord/constants";
import { Artwork, FlyingArtwork } from "./Artwork";
import Marquee from "react-marquee-slider";

const Container = styled.div<{ $loading: boolean }>`
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
  transition: opacity 1s ease;
  width: 100%;
  height: 100%;
`;

export const FoodGallery: React.FunctionComponent = () => {
  const { data } = ClientChannel.useMessagesInChannel(
    DISCORD_CHANNELS.photos.id,
    20
  );

  const artworks = data?.flat()?.flatMap(Artwork.fromMessage);

  const [isScattering, setIsScattering] = useState<boolean>(true);

  return (
    <Container $loading={isScattering}>
      {artworks ? (
        <Marquee
          velocity={12}
          resetAfterTries={500}
          scatterRandomly
          direction="rtl"
          onInit={() => setIsScattering(true)}
          onFinish={() => setIsScattering(false)}
        >
          {artworks.map((artwork, index) => {
            return <FlyingArtwork artwork={artwork} key={index} />;
          })}
        </Marquee>
      ) : null}
    </Container>
  );
};
