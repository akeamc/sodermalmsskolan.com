import React, { Fragment, FunctionComponent } from "react";
import Image from "next/image";
import { DateTime } from "luxon";
import Post from "../../lib/ghost/post";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { HeaderHeading, SmallHeading, SubTitle } from "../text/headings";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import AuthorName from "../author/Name";
import darkTheme from "../../styles/themes/dark";

export interface PostHeaderProps {
  post: Post;
}

/**
 * Post header, with a nice picture.
 *
 * @param {React.PropsWithChildren<PostHeaderProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered header.
 */
const PostHeader: FunctionComponent<PostHeaderProps> = ({ post }) => (
  <>
    <div
      css={{
        position: "relative",
        minHeight: "80vh",
        margin: 0,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",

        [media(breakpoints.medium)]: {
          marginLeft: "3rem",
          marginRight: "3rem",
        },
      }}
    >
      <Container css={[darkTheme, {
        flex: 1,
      }]}
      >
        <div
          css={{
            position: "relative",
            padding: "3rem 0",
            zIndex: 1,
            maxWidth: "56rem",

            [media(breakpoints.large)]: {
              paddingTop: "6rem",
              paddingBottom: "6rem",
            },
          }}
        >
          <HeaderHeading>{post?.title ?? <InlineSkeleton />}</HeaderHeading>
          <SubTitle css={{
            marginTop: "2rem",
          }}
          >
            {post?.excerpt}
          </SubTitle>
          <div css={{
            marginTop: "2rem",
          }}
          >
            <SmallHeading css={{
              color: "var(--color-text-primary)",
              opacity: 0.7,
            }}
            >
              {(post?.authors ?? new Array(2).fill(null)).map((author, index) => (
                <Fragment key={author?.id ?? index}>
                  {index !== 0 ? ", " : null}
                  <AuthorName author={author} />
                </Fragment>
              ))}
              {" "}
              {post?.publishedAt ? DateTime.fromISO(post.publishedAt).toLocaleString(DateTime.DATETIME_SHORT) : <InlineSkeleton width="10em" />}
            </SmallHeading>
          </div>
        </div>
      </Container>
      {post?.cover ? (
        <Image
          src={post?.cover}
          layout="fill"
          css={{
            objectFit: "cover",
            filter: "brightness(0.3)",
          }}
        />
      ) : null}
    </div>
  </>
);

export default PostHeader;
