import styled from "styled-components";
import React from "react";
import { LinkBlock } from "./Link";
import { GenericUser } from "../../lib/models/User";
import pxcmprs from "../../lib/utils/pxcmprs";

interface AvatarProps {
  $size?: number;
  $placeholder?: boolean;
}

function avatarSizeToEm(size = 2): number {
  return size;
}

export const useSmallAvatar = (source = ""): string => {
  return pxcmprs.generateUrl({
    width: 256,
    source,
  });
};

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
`;

export const AvatarWrapper = styled(LinkBlock)<AvatarProps>`
  border-radius: 50%;
  box-sizing: border-box;

  ${({ $size }) => {
    const width = avatarSizeToEm($size);

    return `
      width: ${width}rem;
      height: ${width}rem;
    `;
  }}

  background: var(--background);
  display: inline-block;

  ${({ $placeholder }) => $placeholder && `border: 1px solid var(--accents-2)`};
`;

export const Avatar: React.FunctionComponent<{
  href?: string;
  imageUrl?: string;
  size?: number;
  useProxy?: boolean;
  placeholder?: boolean;
}> = ({
  href = "#",
  imageUrl = "",
  size,
  useProxy = true,
  placeholder = false,
}) => {
  return (
    <AvatarWrapper $placeholder={placeholder} href={href} $size={size}>
      {!placeholder && (
        <AvatarImage src={useProxy ? useSmallAvatar(imageUrl) : imageUrl} />
      )}
    </AvatarWrapper>
  );
};

const AvatarGroup = styled.div<AvatarProps>`
  display: inline-flex;
  position: relative;
  flex-direction: row-reverse;
  padding-left: ${({ $size: size }) => avatarSizeToEm(size) / 2}rem;

  ${AvatarWrapper} {
    margin-left: ${({ $size: size }) => avatarSizeToEm(size) / -2}rem;
    border: 2px solid var(--background);
    box-sizing: content-box;

    &:hover {
      z-index: 1;
    }
  }
`;

const AvatarGroupContainer = styled.div`
  ${AvatarGroup} {
    margin: -2px;
  }

  margin-bottom: -4px;
`;

export const AuthorGroup: React.FunctionComponent<{
  authors: GenericUser[];
  size?: number;
}> = ({ authors, size }) => {
  return (
    <AvatarGroupContainer>
      <AvatarGroup>
        {authors.reverse().map((author, index) => (
          <Avatar
            key={index}
            href={author.url}
            imageUrl={author.avatarUrl}
            size={size}
          />
        ))}
      </AvatarGroup>
    </AvatarGroupContainer>
  );
};
