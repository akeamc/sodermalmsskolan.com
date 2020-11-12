import { PostOrPage } from "@tryghost/content-api";
import styled from "styled-components";
import { LeadText } from "../basic/Typography";
import { HeaderWithBackground } from "../layout/Header";
import React from "react";
import PostMeta from "./meta/PostMeta";
import { HeroTitle } from "../layout/Hero";

const Lead = styled(LeadText)``;

export const ArticleHero: React.FunctionComponent<{
  post: PostOrPage;
  dateText: string;
}> = ({ post, dateText }) => {
  return (
    <HeaderWithBackground
      image={post?.feature_image}
      minHeight="calc(80vh - var(--navigation-height))"
    >
      <HeroTitle>{post?.title}</HeroTitle>
      {post?.custom_excerpt && <Lead>{post?.custom_excerpt}</Lead>}
      <PostMeta post={post} dateText={dateText} />
    </HeaderWithBackground>
  );
};
