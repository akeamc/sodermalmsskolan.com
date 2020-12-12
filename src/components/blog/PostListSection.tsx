import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { LimitParam } from "../../lib/ghost/common";
import Button from "../button/Button";
import CardGridSection from "../CardGridSection";
import { SectionProps } from "../Section";
import PostCard from "./PostCard";

export interface PostListSectionProps extends SectionProps {
  limit?: LimitParam,
  showMoreButton?: boolean;
}

const PostListSection: FunctionComponent<PostListSectionProps> = ({ limit = "all", showMoreButton = false, ...sectionProps }) => {
  const { data } = usePosts(limit);

  const skeletonPosts = typeof limit === "number" ? limit : 12;

  return (
    <CardGridSection
      header={{
        title: "Samtliga inlägg",
        superTitle: "Blogg",
      }}
      bottomText={
        showMoreButton ? <Button href="/blogg" primary>Visa alla inlägg</Button> : null
      }
      {...sectionProps}
    >
      {(data || new Array(skeletonPosts).fill(null))
        .map((post, index) => <PostCard post={post} key={post?.id || index} />)}

    </CardGridSection>
  );
};

export default PostListSection;
