import { Theme } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import Author from "../../lib/ghost/author";
import { useAuthorUrl } from "../../lib/ghost/hooks/author";
import Skeleton from "../Skeleton";
import { CardTitle } from "../text/headings";

/**
 * A component used to display an author.
 */
const BigAuthor: FunctionComponent<{ author: Author }> = ({ author }) => {
  const url = useAuthorUrl(author?.slug);

  const inner = (
    <a css={{
      textAlign: "center",
      color: "inherit",
      textDecoration: "none",
    }}
    >
      <div css={(theme: Theme) => ({
        width: "6rem",
        height: "6rem",
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
        backgroundColor: theme.color.skeleton.base,
        margin: "0 auto",

        img: {
          objectFit: "cover",
        },
      })}
      >
        {author?.profileImage ? <Image src={author?.profileImage} layout="fill" /> : null}
      </div>
      <CardTitle css={{
        marginTop: "1rem",
      }}
      >
        {author?.name || <Skeleton />}
      </CardTitle>
    </a>
  );

  if (url) {
    return <Link href={url} passHref>{inner}</Link>;
  }

  return inner;
};

export default BigAuthor;
