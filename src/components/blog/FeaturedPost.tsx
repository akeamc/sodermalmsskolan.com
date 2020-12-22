import { Theme, ThemeProvider } from "@emotion/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { usePostUrl } from "../../lib/blog/hooks/post";
import Post from "../../lib/ghost/post";
import { breakpoints, media } from "../../styles/breakpoints";
import darkTheme from "../../styles/theme/dark";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { H2, SmallHeading } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

const FeaturedPost: FunctionComponent<{post: Post}> = ({ post }) => {
  const { language } = useLocale();
  const url = usePostUrl(post?.slug);

  const timestamp = post?.publishedAt ? dayjs(post?.publishedAt).locale(language) : null;

  const inner = (
    <article css={(theme: Theme) => ({
      position: "relative",
      minHeight: "30rem",

      "&:hover": {
        figure: {
          margin: "-5px",
          boxShadow: theme.shadow.large,

          img: {
            transform: "scale(1)",
            opacity: 0.75,
          },
        },
      },
    })}
    >
      <ThemeProvider theme={darkTheme}>
        <div css={{
          position: "relative",
          zIndex: 1,
          padding: "2rem",
          boxSizing: "border-box",

          [media(breakpoints.medium)]: {
            padding: "4rem",
          },
        }}
        >
          <SmallHeading css={(theme: Theme) => ({
            marginBottom: "1rem",
            color: theme.color.text.primary,
            opacity: 0.5,
          })}
          >
            {timestamp?.format("D MMMM YYYY HH:mm") || <InlineSkeleton width="11em" />}
          </SmallHeading>
          <H2 css={{
            maxWidth: "37.5rem",
          }}
          >
            {post?.title || <InlineSkeleton count={2} />}
          </H2>
          <CardDescription css={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "90%",
          }}
          >
            {post?.excerpt || <InlineSkeleton count={5} />}
          </CardDescription>
        </div>
      </ThemeProvider>
      <figure css={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        borderRadius: "0.5rem",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        backgroundColor: "#000000",
      }}
      >
        {post?.cover
          ? (
            <Image
              css={{
                objectFit: "cover",
                transform: "scale(1.1)",
                transition: "all 0.2s ease-in-out",
                opacity: 0.5,
              }}
              src={post?.cover}
              layout="fill"
            />
          ) : null}
      </figure>
    </article>
  );

  return url ? (
    <Link href={url} passHref>
      <a css={{
        textDecoration: "none",
      }}
      >
        {inner}
      </a>
    </Link>
  ) : inner;
};

export default FeaturedPost;
