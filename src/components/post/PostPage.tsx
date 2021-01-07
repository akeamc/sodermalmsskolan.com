import React, { FunctionComponent } from "react";
import Post from "../../lib/ghost/post";
import BannerAd from "../ads/BannerAd";
import Base from "../Base";
import Section from "../section/Section";
import PostHeader from "./PostHeader";
import PostView from "./PostView";

export interface PostPageProps {
  post: Post;
  digibruh?: boolean;
}

const PostPage: FunctionComponent<PostPageProps> = ({ post }) => (
  <Base metadata={{
    title: post?.title,
    description: post?.excerpt,
    images: [post?.cover],
    type: "article",
    article: {
      published: post?.publishedAt ? new Date(post?.publishedAt) : null,
      modified: post?.updatedAt ? new Date(post?.updatedAt) : null,
    },
  }}
  >
    <PostHeader post={post} />
    <Section>
      <BannerAd />
    </Section>
    <Section>
      <PostView post={post} />
    </Section>
  </Base>
);

export default PostPage;
