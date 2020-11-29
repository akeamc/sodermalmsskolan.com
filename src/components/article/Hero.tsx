import { PostOrPage } from "@tryghost/content-api";
import { LeadText } from "../basic/Typography";
import { HeaderWithBackground } from "../layout/Header";
import React from "react";
import PostMeta from "./meta/PostMeta";
import { HeroTitle } from "../layout/Hero";

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
      {post?.custom_excerpt ? (
        <LeadText>{post?.custom_excerpt}</LeadText>
      ) : null}
      <PostMeta post={post} dateText={dateText} />
    </HeaderWithBackground>
  );
};
