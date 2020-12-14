import React, { FunctionComponent, useRef } from "react";
import Image from "next/image";
import { ThemeProvider } from "@emotion/react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Post from "../../lib/ghost/post";
import Skeleton from "../Skeleton";
import { HeaderHeading, SubTitle } from "../text/headings";
import { breakpoints, media } from "../../styles/breakpoints";
import Navbar from "../navigation/Navbar";
import Container from "../Container";
import darkTheme from "../../styles/theme/dark";

export interface PostHeaderProps {
  post: Post;
}

const PostHeader: FunctionComponent<PostHeaderProps> = ({ post }) => {
  const { scrollY } = useViewportScroll();
  const wrapperRef = useRef<HTMLDivElement>();

  const scrollProgress = useTransform(scrollY,
    ((y) => (y / wrapperRef?.current?.getBoundingClientRect()?.height) || 0));

  const backgroundOpacity = useTransform(scrollProgress, (progress) => (0.5 + progress));
  const foregroundOpacity = useTransform(scrollProgress, (progress) => (1 - progress));

  return (
    <>
      <Navbar />
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
        <ThemeProvider theme={darkTheme}>
          <Container css={{
            flex: 1,
          }}
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
              <HeaderHeading>{post?.title || <Skeleton />}</HeaderHeading>
              <SubTitle css={{
                marginTop: "2rem",
              }}
              >
                {post?.excerpt}
              </SubTitle>
            </motion.div>
          </Container>
        </ThemeProvider>
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
