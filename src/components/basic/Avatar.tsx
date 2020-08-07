import styled from "styled-components";
import React from "react";
import { LinkBlock } from "./Link";
import { GenericUser } from "../../lib/models/User";
import pxcmprs from "../../lib/utils/pxcmprs";

interface AvatarProps {
  size?: number;
}

function avatarSizeToPx(size: number = 2): number {
  return size * 16;
}

export const useSmallAvatar = (source: string) => {
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

  ${({ size }) => {
    let width = avatarSizeToPx(size);

    return `
      width: ${width}px;
      height: ${width}px;
    `;
  }}

  background: var(--background);
  display: inline-block;
`;

export const Avatar: React.FunctionComponent<{
  href?: string;
  imageUrl: string;
  size?: number;
}> = ({ href = "#", imageUrl = "", size }) => {
  return (
    <AvatarWrapper href={href} size={size}>
      <AvatarImage src={useSmallAvatar(imageUrl)} />
    </AvatarWrapper>
  );
};

const AvatarGroup = styled.div<AvatarProps>`
  display: inline-flex;
  position: relative;
  flex-direction: row-reverse;
  padding-left: ${({ size }) => avatarSizeToPx(size) / 2}px;

  ${AvatarWrapper} {
    margin-left: ${({ size }) => avatarSizeToPx(size) / -2}px;
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

export class AuthorGroup extends React.Component<{
  authors: GenericUser[];
  size?: number;
}> {
  render() {
    const { authors, size } = this.props;

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
  }
}
