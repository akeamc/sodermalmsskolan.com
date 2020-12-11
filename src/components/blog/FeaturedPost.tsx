import { Theme, ThemeProvider } from "@emotion/react";
import { PostOrPage } from "@tryghost/content-api";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import { useLang } from "../../hooks/lang";
import { breakpoints, media } from "../../styles/breakpoints";
import darkTheme from "../../styles/theme/dark";
import Skeleton from "../Skeleton";
import { H2, SmallHeading } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

const FeaturedPost: FunctionComponent<{post: PostOrPage}> = ({ post }) => {
  const lang = useLang();

  const timestamp = post?.published_at ? dayjs(post?.published_at).locale(lang) : null;

  const inner = (
    <article css={(theme: Theme) => ({
      position: "relative",
      minHeight: "30rem",
      backgroundColor: theme.color.skeleton.base,

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
          <SmallHeading css={{
            marginBottom: "1rem",
          }}
          >
            {timestamp?.format("D MMMM YYYY HH:mm") || <Skeleton width="11em" />}
          </SmallHeading>
          <H2 css={{
            maxWidth: "37.5rem",
          }}
          >
            {post?.title || <Skeleton count={2} />}
          </H2>
          <CardDescription css={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            width: "90%",
          }}
          >
            {post?.excerpt || <Skeleton count={5} />}
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
        {post?.feature_image
          ? (
            <Image
              css={{
                objectFit: "cover",
                transform: "scale(1.1)",
                transition: "all 0.2s ease-in-out",
                opacity: 0.5,
              }}
              src={post?.feature_image}
              layout="fill"
            />
          ) : null}
      </figure>
    </article>
  );

  return post?.url ? (
    <Link href={post?.url} passHref>
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
