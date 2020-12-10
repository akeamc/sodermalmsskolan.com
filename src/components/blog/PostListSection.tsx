import { LimitParam } from "@tryghost/content-api";
import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/ghost/post";
import { breakpoints, media } from "../../styles/breakpoints";
import Button from "../button/Button";
import Section, { SectionProps } from "../Section";
import PostCard from "./PostCard";

export interface PostListSectionProps extends SectionProps {
  limit?: LimitParam,
  showMoreButton?: boolean;
}

const PostListSection: FunctionComponent<PostListSectionProps> = ({ limit = "all", showMoreButton = false, ...sectionProps }) => {
  const { data } = usePosts({ limit });

  const skeletonPosts = typeof limit === "number" ? limit : 12;

  return (
    <Section
      header={{
        title: "Samtliga inlägg",
        superTitle: "Blogg",
      }}
      {...sectionProps}
    >
      <div css={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.5rem",

        [media(breakpoints.small)]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },

        [media(breakpoints.medium)]: {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
      }}
      >
        {(data || new Array(skeletonPosts).fill(null))
          .map((post, index) => <PostCard post={post} key={post?.id || index} />)}
      </div>
      {showMoreButton ? (
        <div css={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
        >
          <Button href="/blogg" primary>Visa alla inlägg</Button>
        </div>
      ) : null}
    </Section>
  );
};

export default PostListSection;
