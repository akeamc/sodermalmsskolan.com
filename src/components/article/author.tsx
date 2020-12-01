import styled from "styled-components";
import { LinkBlock } from "../basic/Link";
import { Author } from "@tryghost/content-api";
import React from "react";
import { getAuthorUrl } from "../../lib/ghost/author";
import { Skeleton } from "../basic/Skeleton";
import Image from "next/image";

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

const AuthorImageWrapper = styled.div`
  width: 18px;
  height: 18px;
  margin: -2px 8px -2px -2px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`;

const AuthorName = styled.small`
  white-space: nowrap;
`;

const AuthorCard: React.FunctionComponent<{
  author: Author;
  skeleton?: boolean;
}> = ({ author, skeleton = false }) => {
  const href = skeleton ? "" : getAuthorUrl(author?.slug);

  return (
    <AuthorCardContainer href={href}>
      <AuthorImageWrapper>
        {author?.profile_image ? (
          <Image src={author?.profile_image} layout="fill" />
        ) : null}
        ;
      </AuthorImageWrapper>
      <AuthorName>
        {skeleton ? <Skeleton width="100px" /> : author?.name}
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
