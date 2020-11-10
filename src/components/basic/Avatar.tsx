import styled from "styled-components";
import React from "react";
import { LinkBlock } from "./Link";
import { GenericUser } from "../../lib/models/User";
import Image from "next/image";

interface AvatarProps {
  $size?: number;
  $placeholder?: boolean;
}

function avatarSizeToEm(size = 2): number {
  return size;
}

const AvatarImage = styled(Image).attrs({
  layout: "fill",
})`
  object-fit: cover;
`;

export const AvatarWrapper = styled(LinkBlock)<AvatarProps>`
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  ${({ $size }) => {
    const width = avatarSizeToEm($size);

    return `
      width: ${width}rem;
      height: ${width}rem;
    `;
  }}

  background: ${({ theme }) => theme.colors.background};
  display: inline-block;

  ${({ $placeholder, theme }) =>
    $placeholder && `border: 1px solid ${theme.colors.border}`};
`;

export const Avatar: React.FunctionComponent<{
  href?: string;
  src?: string;
  size?: number;
  placeholder?: boolean;
}> = ({ href = "#", src, size, placeholder = false }) => {
  return (
    <AvatarWrapper $placeholder={placeholder} href={href} $size={size}>
      {!placeholder && src ? <AvatarImage src={src} /> : null}
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
    border: 2px solid ${({ theme }) => theme.colors.background};
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
            src={author.avatarUrl}
            size={size}
          />
        ))}
      </AvatarGroup>
    </AvatarGroupContainer>
  );
};
