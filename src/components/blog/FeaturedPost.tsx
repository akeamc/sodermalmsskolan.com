import React from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { Card, CardContent } from "../basic/Card";
import { getPosts } from "../../lib/ghost/post";
import useSWR from "swr";
import { useProgressiveImage } from "../basic/ProgressiveImage";
import { getPostUrl } from "./PostGrid";
import { getLineClamp } from "../basic/CardGrid";
import moment from "moment";
import PostMeta from "./meta/PostMeta";
import * as breakpoints from "../../styles/breakpoints";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useLocale } from "../../hooks/locale";
import { transparentLightPalette } from "../../styles/themes";
import { Skeleton } from "../basic/Skeleton";
import { Anchor, Muted } from "../basic/Typography";

const CardWrapper = styled(Anchor)`
  grid-column: span 12;
  display: block;
`;

const Background = styled.div<{ image: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url("${({ image }) => useProgressiveImage(image).src}");
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.2s ease-in-out;
`;

const BigCard = styled(Card)`
  position: relative;
  overflow: hidden;

  &:hover {
    ${Background} {
      transform: scale(1.1);
    }
  }
`;

const BigCardContent = styled(CardContent)`
  padding: 2rem 1rem;
  max-width: 400px;
  z-index: 1;

  @media (min-width: ${breakpoints.small}) {
    padding: 4rem 2rem;
  }

  @media (min-width: ${breakpoints.medium}) {
    padding: 6rem 3rem;
  }
`;

const FeaturedPost: React.FunctionComponent = () => {
  const { data, isValidating } = useSWR("/blog/posts?limit=1", () =>
    getPosts(1)
  );

  const post = data ? data[0] : null;
  const loading = isValidating && !data;
  const excerptLineLimit = 5;
  const { src: imageSrc } = useProgressiveImage(post?.feature_image);

  const { ref, inView } = useInView();
  const show = inView && post;

  const { locale } = useLocale();

  const theme = useTheme();

  return (
    <ThemeProvider theme={{ ...theme, colors: transparentLightPalette }}>
      <Link href={getPostUrl(post?.slug)} passHref>
        <CardWrapper ref={ref}>
          <motion.div
            variants={{
              show: {
                opacity: 1,
                y: 0,
              },
              hide: {
                opacity: 0,
                y: 32,
              },
            }}
            animate={show ? "show" : "hide"}
            initial={false}
          >
            <BigCard>
              <Background image={imageSrc} />
              <BigCardContent>
                <h2>{loading ? <Skeleton count={3} /> : post?.title}</h2>
                <Muted style={getLineClamp(excerptLineLimit)}>
                  {loading ? (
                    <Skeleton count={excerptLineLimit} />
                  ) : (
                    post?.excerpt
                  )}
                </Muted>
                <PostMeta
                  post={post}
                  dateText={moment(post?.published_at)
                    .locale(locale)
                    .format("D MMMM YYYY")}
                  skeleton={loading}
                />
              </BigCardContent>
            </BigCard>
          </motion.div>
        </CardWrapper>
      </Link>
    </ThemeProvider>
  );
};

export default FeaturedPost;
