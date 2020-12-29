import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import CardGrid from "../grid/CardGrid";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";

const BlogHeader: FunctionComponent<{posts?: number}> = ({ posts = 3 }) => {
  const { data } = usePosts(
    posts,
  );

  const featured = data?.[0];
  const rest = data?.slice(1, posts);

  return (
    <div>
      <header css={{
        padding: "var(--header-padding)",
      }}
      >
        <Container>
          <CardGrid>
            <div css={{
              [media(breakpoints.medium)]: {
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2",
              },
            }}
            >
              <FeaturedPost
                post={featured}
              />
            </div>
            {(rest || new Array(posts - 1).fill(null))
              .map((post, index) => <PostCard post={post} key={post?.id || index} />)}
          </CardGrid>
        </Container>
      </header>
    </div>
  );
};

export default BlogHeader;
