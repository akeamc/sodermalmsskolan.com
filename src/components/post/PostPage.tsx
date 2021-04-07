import { DateTime } from "luxon";
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

/**
 * Pseudo page used to render blog and Digibruh posts.
 *
 * @param {React.PropsWithChildren<PostPageProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered post.
 */
const PostPage: FunctionComponent<PostPageProps> = ({ post }) => (
  <Base metadata={{
    title: post?.title,
    description: post?.excerpt,
    images: [post?.cover],
    twitterCard: "summary_large_image",
    type: "article",
    article: {
      published: DateTime.fromISO(post?.publishedAt),
      modified: DateTime.fromISO(post?.updatedAt),
    },
  }}
  >
    <PostHeader post={post} />
    <Section containerProps={{
      width: "wide",
    }}
    >
      <BannerAd />
    </Section>
    <Section containerProps={{
      width: "wide",
    }}
    >
      <PostView post={post} />
    </Section>
  </Base>
);

export default PostPage;
