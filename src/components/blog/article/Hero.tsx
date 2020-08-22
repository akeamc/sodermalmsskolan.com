import { PostOrPage } from "@tryghost/content-api";
import styled from "styled-components";
import { LeadText } from "../../basic/Typography";
import { useSmallAvatar } from "../../basic/Avatar";
import { LinkBlock } from "../../basic/Link";
import { getAuthorUrl } from "../../../lib/api/ghost/author";
import { HeaderWithBackground } from "../../layout/Header";
import React from "react";

const Lead = styled(LeadText)``;

const MetaRow = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const MetaField = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--accents-5);

  &:not(:last-child) {
    margin-right: 15px;
    padding-right: 15px;
    border-right: 1px solid var(--accents-2);
  }
`;

const AuthorCard = styled(LinkBlock)`
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

export const ArticleHero: React.FunctionComponent<{
  post: PostOrPage;
  dateText: string;
}> = ({ post, dateText }) => {
  return (
    <HeaderWithBackground
      image={post?.feature_image}
      minHeight="calc(80vh - var(--navigation-height))"
    >
      <h1>{post?.title}</h1>
      {post?.custom_excerpt && <Lead>{post?.custom_excerpt}</Lead>}
      <MetaRow>
        <MetaField>
          {(post?.authors || []).map((author, index) => (
            <AuthorCard key={index} href={getAuthorUrl(author?.slug)}>
              <AuthorImage src={useSmallAvatar(author?.profile_image)} />
              <AuthorName>{author?.name}</AuthorName>
            </AuthorCard>
          ))}
        </MetaField>
        <MetaField>
          <small>{dateText}</small>
        </MetaField>
      </MetaRow>
    </HeaderWithBackground>
  );
};
