import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { LimitParam } from "../../lib/ghost/common";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import PostTitle, { PostTitleSize } from "./PostTitle";

export interface BlogHeaderProps {
  postCount?: LimitParam;
}

/**
 * A blog header.
 *
 * @param {React.PropsWithChildren<BlogHeaderProps>} props Props!
 *
 * @returns {React.ReactElement} The rendered header.
 */
const BlogHeader: FunctionComponent<BlogHeaderProps> = ({
  postCount = "all",
}) => {
  const { data } = usePosts(postCount);

  const featured = data?.[0];

  const rest = data.slice(1);

  const fallbackPostCount = typeof postCount === "number" ? postCount - 1 : 12;

  return (
    <div>
      <header css={{
        padding: "var(--header-padding)",
      }}
      >
        <Container>
          <div css={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "1.5rem",

            [media(breakpoints.medium)]: {
              gap: "2rem",
            },
          }}
          >
            <div css={{
              gridColumn: "span 6",
            }}
            >
              <PostTitle
                size="large"
                layout="card"
                post={featured}
              />
            </div>
            {(rest ?? new Array(fallbackPostCount).fill(null))
              .map((post, index) => {
                const size: PostTitleSize = index <= 1 ? "medium" : "small";

                return (
                  <PostTitle
                    size={size}
                    post={post}
                    key={post?.id ?? index}
                    css={{
                      gridColumn: size === "medium" ? "span 3" : "span 2",
                    }}
                  />
                );
              })}
          </div>
        </Container>
      </header>
    </div>
  );
};

export default BlogHeader;
