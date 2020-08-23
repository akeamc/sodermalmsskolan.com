import styled from "styled-components";
import { LinkBlock } from "../../basic/Link";
import { Author } from "@tryghost/content-api";
import React from "react";
import { getAuthorUrl } from "../../../lib/api/ghost/author";
import { useSmallAvatar } from "../../basic/Avatar";
import Skeleton from "react-loading-skeleton";
import { MetaField } from "./PostMeta";

const AuthorCardContainer = styled(LinkBlock)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  margin-left: 2px;

  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const AuthorImage = styled.div<{ src: string }>`
  width: 18px;
  height: 18px;
  margin: -2px 8px -2px -2px;
  background-color: #eee;
  background-size: cover;
  background-position: center;
  background-image: ${({ src }) => `url(${src})`};
  border-radius: 50%;
`;

const AuthorName = styled.small`
  white-space: nowrap;
`;

const AuthorCard: React.FunctionComponent<{
  author: Author;
  skeleton?: boolean;
}> = ({ author, skeleton = false }) => {
  const href = skeleton ? "" : getAuthorUrl(author?.slug);
  const imageSrc = useSmallAvatar(author?.profile_image);

  return (
    <AuthorCardContainer href={href}>
      <AuthorImage src={imageSrc} />
      <AuthorName>
        {skeleton ? <Skeleton width={100} /> : author?.name}
      </AuthorName>
    </AuthorCardContainer>
  );
};

const RowContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: -0.875rem;

  ${AuthorCardContainer} {
    margin-bottom: 0.875rem;
  }
`;

export const AuthorCardRow: React.FunctionComponent<{
  authors: Author[];
  skeleton?: boolean;
}> = ({ authors, skeleton }) => (
  <RowContainer>
    {(authors || [null]).map((author, index) => (
      <AuthorCard key={index} author={author} skeleton={skeleton} />
    ))}
  </RowContainer>
);

export default AuthorCard;
