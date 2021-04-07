import React, { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";
import Post from "../../lib/ghost/post";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { fonts } from "../../styles/text";
import { breakpoints, media } from "../../styles/breakpoints";
import darkTheme from "../../styles/themes/dark";
import { skeletonBackground } from "../skeleton/Skeleton";
import getPostPath from "../../lib/blog/utils/getPostPath";

export type PostTitleSize = "small" | "medium" | "large";

export type PostTitleLayout = "card" | "background";

export interface PostTitleProps {
  post: Post;
  size?: PostTitleSize;
  layout?: PostTitleLayout;
}

/**
 * A card displaying a post.
 *
 * @param {React.PropsWithChildren<PostTitleProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered element.
 */
const PostTitle: FunctionComponent<PostTitleProps> = ({
  post,
  size = "medium",
  layout = "card",
  ...props
}) => {
  const url = getPostPath(post?.slug);

  const mediaWidth = layout === "background" ? 1200 : 600;

  const inner = (
    <a
      css={[{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: "0.5rem",
        color: "var(--color-text-primary)",
        textDecoration: "none",
        backgroundColor: "var(--color-bg-primary)",
        boxShadow: layout === "card" ? "inset 0 0 0 1px var(--color-border-primary)" : undefined,
        position: "relative",

        "&:hover": {
          figure: {
            img: {
              transform: "scale(1.03)",
              filter: "brightness(0.7)",
            },
          },
        },
      }, layout === "card" && size === "large" ? {
        [media(breakpoints.medium)]: {
          flexDirection: "row",
          minHeight: "24rem",
        },
      } : undefined, layout === "background" ? {
        flexDirection: "row",
        minHeight: "34rem",
      } : undefined,
      ]}
      {...props}
    >
      <figure
        css={[skeletonBackground, {
          position: "relative",
          flex: "0 0 10.625rem",
          display: "block",
          margin: 0,
          padding: 0,
          overflow: "hidden",

          "> div": {
            width: "100% !important",
            height: "100% !important",
            position: "absolute !important" as never,
            top: 0,
            left: 0,
          },
        }, size === "medium" ? {
          [media(breakpoints.medium)]: {
            flexBasis: "16rem",
          },
        } : undefined, size === "large" ? {
          [media(breakpoints.medium)]: {
            flexBasis: "30rem",
            flexShrink: 1,
          },

          [media(breakpoints.large)]: {
            flexBasis: "42rem",
          },
        } : undefined, layout === "background" ? {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,

          "&::after": {
            content: "\"\"",
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            paddingTop: "100%",
            backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9))",

            [media(breakpoints.medium)]: {
              paddingTop: "33.75%",
            },
          },
        } : undefined]}
      >
        {typeof post?.cover === "string" ? (
          <Image
            src={post.cover}
            layout="fixed"
            width={mediaWidth}
            height={mediaWidth}
            objectFit="cover"
            css={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        ) : undefined}
      </figure>
      <div
        css={[{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          position: "relative",
          zIndex: 1,
        }, size === "large" ? {
          [media(breakpoints.medium)]: {
            padding: "2rem",
          },
        } : undefined, layout === "background" ? [
          darkTheme, {
            marginTop: "auto",
          }] : undefined]}
      >
        <h3 css={[{
          fontSize: "1.125rem",
          margin: 0,
          letterSpacing: "-0.012em",
          fontFamily: fonts.sans,
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: "0.5em",
          color: "var(--color-text-primary)",
        }, size === "medium" ? {
          [media(breakpoints.medium)]: {
            fontSize: "1.5rem",
          },
        } : undefined, size === "large" ? {
          [media(breakpoints.medium)]: {
            fontSize: "2rem",
          },
        } : undefined, layout === "background" ? {
          fontSize: "3rem !important",
        } : undefined]}
        >
          {post?.title ?? <InlineSkeleton count={3} />}
        </h3>
        <time css={{
          fontSize: "0.875rem",
          color: "var(--color-text-tertiary)",
          marginTop: layout === "card" ? "auto" : undefined,
          fontFamily: fonts.sans,
          fontWeight: 600,
          lineHeight: 1.2,
        }}
        >
          {post?.publishedAt ? DateTime.fromISO(post.publishedAt).toLocaleString(DateTime.DATE_MED) : <InlineSkeleton width="8em" />}
        </time>
      </div>
    </a>
  );

  if (typeof url === "string") {
    return (
      <Link href={url} passHref>
        {inner}
      </Link>
    );
  }

  return inner;
};

export default PostTitle;
