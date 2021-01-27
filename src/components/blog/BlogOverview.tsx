import React, { FunctionComponent } from "react";
import { usePosts } from "../../lib/blog/hooks/post";
import { LimitParam } from "../../lib/ghost/common";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import PostTitle, { PostTitleSize } from "./PostTitle";

export interface BlogOverviewProps {
  postLimit?: LimitParam;
}

/**
 * A blog overview component.
 *
 * @param {React.PropsWithChildren<BlogOverviewProps>} props Props!
 *
 * @returns {React.ReactElement} The rendered container.
 */
const BlogOverview: FunctionComponent<BlogOverviewProps> = ({
  postLimit = "all",
}) => {
  const { data } = usePosts(postLimit);

  const featured = data?.[0];

  const rest = data?.slice(1);

  const fallbackPostCount = typeof postLimit === "number" ? postLimit - 1 : 12;

  return (
    <div>
      <div css={{
        paddingTop: "var(--page-gutter)",
      }}
      >
        <Container>
          <div css={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "1.5rem",

            [media(breakpoints.small)]: {
              gap: "2rem",
              gridTemplateColumns: "repeat(6, 1fr)",
            },
          }}
          >
            <div css={{
              [media(breakpoints.small)]: {
                gridColumn: "span 6",
              },
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
                      [media(breakpoints.small)]: {
                        gridColumn: "span 3",
                      },

                      [media(breakpoints.medium)]: {
                        gridColumn: size === "medium" ? "span 3" : "span 2",
                      },
                    }}
                  />
                );
              })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default BlogOverview;
