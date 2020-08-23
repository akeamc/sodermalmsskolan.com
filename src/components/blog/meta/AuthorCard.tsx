import styled from "styled-components";
import { LinkBlock } from "../../basic/Link";
import { Author } from "@tryghost/content-api";
import React from "react";
import { getAuthorUrl } from "../../../lib/api/ghost/author";
import { useSmallAvatar } from "../../basic/Avatar";

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
  background-size: cover;
  background-position: center;
  background-image: ${({ src }) => `url(${src})`};
  border-radius: 50%;
`;

const AuthorName = styled.small`
  white-space: nowrap;
`;

const AuthorCard: React.FunctionComponent<{ author: Author }> = ({
  author,
}) => (
  <AuthorCardContainer href={getAuthorUrl(author?.slug)}>
    <AuthorImage src={useSmallAvatar(author?.profile_image)} />
    <AuthorName>{author?.name}</AuthorName>
  </AuthorCardContainer>
);

export default AuthorCard;
