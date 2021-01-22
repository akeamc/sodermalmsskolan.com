import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import CardGrid from "../grid/CardGrid";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";

export interface BlogHeaderProps {
  postCount?: number;
}

/**
 * A blog header.
 *
 * @param {React.PropsWithChildren<BlogHeaderProps>} props Props!
 *
 * @returns {React.ReactElement} The rendered header.
 */
const BlogHeader: FunctionComponent<BlogHeaderProps> = ({ postCount = 3 }) => {
  const { data } = usePosts(
    postCount,
  );

  const featured = data?.[0];
  const rest = data?.slice(1, postCount);

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
            {(rest ?? new Array(postCount - 1).fill(null))
              .map((post, index) => <PostCard post={post} key={post?.id ?? index} />)}
          </CardGrid>
        </Container>
      </header>
    </div>
  );
};

export default BlogHeader;
