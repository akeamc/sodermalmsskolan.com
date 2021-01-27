import React, { Fragment, FunctionComponent, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import dayjs from "dayjs";
import Post from "../../lib/ghost/post";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { HeaderHeading, SmallHeading, SubTitle } from "../text/headings";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import useLocale from "../../hooks/useLocale";
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
const PostHeader: FunctionComponent<PostHeaderProps> = ({ post }) => {
  const { scrollY } = useViewportScroll();
  const wrapperRef = useRef<HTMLDivElement>();

  const scrollProgress = useTransform(scrollY,
    ((y) => (y / wrapperRef?.current?.getBoundingClientRect()?.height) || 0));

  const backgroundOpacity = useTransform(scrollProgress, (progress) => (0.5 + progress));
  const foregroundOpacity = useTransform(scrollProgress, (progress) => (1 - progress));

  const { language } = useLocale();

  return (
    <>

      <div
        ref={wrapperRef}
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

          img: {
            objectFit: "cover",
          },
        }}
      >
        <Container css={[darkTheme, {
          flex: 1,
        }]}
        >
          <motion.div
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
            style={{
              opacity: foregroundOpacity,
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
                {post?.publishedAt ? dayjs(post?.publishedAt).locale(language).format("HH:mm D MMMM YYYY") : <InlineSkeleton width="10em" />}
              </SmallHeading>
            </div>
          </motion.div>
        </Container>
        {post?.cover ? (
          <motion.div style={{
            opacity: backgroundOpacity,
          }}
          >
            <Image src={post?.cover} layout="fill" />
          </motion.div>
        ) : null}
      </div>
    </>
  );
};

export default PostHeader;
