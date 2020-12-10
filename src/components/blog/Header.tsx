import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/ghost/post";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import Navbar from "../navigation/Navbar";
import { sectionPaddingStyles } from "../Section";
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";

const BlogHeader: FunctionComponent<{posts?: number}> = ({ posts = 3 }) => {
  const { data } = usePosts({
    limit: posts,
  });

  const featured = data?.[0];
  const rest = data?.slice(1, posts);

  return (
    <div>
      <Navbar />
      <header css={[sectionPaddingStyles.top]}>
        <Container>
          <div css={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",

            [media(breakpoints.medium)]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },

            [media(breakpoints.large)]: {
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(2, 1fr)",
            },
          }}
          >
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
          </div>
        </Container>
      </header>
    </div>
  );
};

export default BlogHeader;
