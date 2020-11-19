import styled from "styled-components";
import { MessageAttachment } from "../../../lib/discord/structures/shared/MessageAttachment";
import React from "react";
import Link from "next/link";
import pxcmprs from "../../../lib/pxcmprs";

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

export const Photo: React.FunctionComponent<{
  attachment: MessageAttachment;
}> = ({ attachment }) => {
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
