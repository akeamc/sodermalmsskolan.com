import React, { FunctionComponent, useMemo } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { LimitParam } from "../../lib/ghost/common";
import { PostFilter } from "../../lib/ghost/post";
import Button from "../button/Button";
import CardGridSection from "../CardGridSection";
import { SectionProps } from "../section/Section";
import PostCard from "./PostCard";

export interface PostListSectionProps extends SectionProps {
  limit?: LimitParam,
  filter?: PostFilter,
  showMoreButton?: boolean;
}

/**
 * A section displaying all posts.
 *
 * @param props
 * @param props.limit
 * @param props.filter
 * @param props.showMoreButton
 */
const PostListSection: FunctionComponent<PostListSectionProps> = ({
  limit = "all", filter = () => true, showMoreButton = false, ...sectionProps
}) => {
  const { data } = usePosts(limit);

  const posts = useMemo(() => data?.filter(filter), [data, filter]);

  const skeletonPosts = typeof limit === "number" ? limit : 12;

  return (
    <CardGridSection
      bottomText={
        showMoreButton ? <Button href="/blogg" primary>Visa alla inlägg</Button> : null
      }
      header={{
        superTitle: "Blogg",
        title: "Samtliga inlägg",
      }}
      {...sectionProps}
    >
      {(posts || new Array(skeletonPosts).fill(null))
        .map((post, index) => <PostCard post={post} key={post?.id || index} />)}

    </CardGridSection>
  );
};

export default PostListSection;
