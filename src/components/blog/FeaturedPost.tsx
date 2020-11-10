import React from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { Card, CardContent } from "../basic/Card";
import { getPosts } from "../../lib/ghost/post";
import useSWR from "swr";
import { getPostUrl } from "./PostGrid";
import { getLineClamp } from "../basic/CardGrid";
import dayjs from "dayjs";
import PostMeta from "./meta/PostMeta";
import * as breakpoints from "../../styles/breakpoints";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useLocale } from "../../hooks/locale";
import { transparentLightPalette } from "../../styles/themes";
import { Skeleton } from "../basic/Skeleton";
import { Anchor, Muted } from "../basic/Typography";
import Image from "next/image";

const CardWrapper = styled(Anchor)`
  grid-column: span 12;
  display: block;
`;

const Background = styled(Image).attrs({
  layout: "fill",
})`
  z-index: 0;
  transition: transform 0.2s ease-in-out;
  object-fit: cover;
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
              {post?.feature_image ? (
                <Background src={post?.feature_image} />
              ) : null}
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
                  dateText={dayjs(post?.published_at)
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
