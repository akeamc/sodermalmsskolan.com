import Image from "next/image";
import Link from "next/link";
import React, { FunctionComponent } from "react";
import Author, { getAuthorPath } from "../../lib/ghost/author";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { skeletonBackground } from "../skeleton/Skeleton";
import { CardTitle } from "../text/headings";

/**
 * A component used to display an author.
 *
 * @param props
 * @param props.author
 */
const BigAuthor: FunctionComponent<{ author: Author }> = ({ author }) => {
  const url = getAuthorPath(author?.slug);

  const inner = (
    <a css={{
      textAlign: "center",
      color: "inherit",
      textDecoration: "none",
    }}
    >
      <div css={[skeletonBackground, {
        width: "6rem",
        height: "6rem",
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
        margin: "0 auto",

        img: {
          objectFit: "cover",
        },
      }]}
      >
        {author?.profileImage ? <Image src={author?.profileImage} layout="fill" /> : null}
      </div>
      <CardTitle css={{
        marginTop: "1rem",
      }}
      >
        {author?.name ?? <InlineSkeleton />}
      </CardTitle>
    </a>
  );

  if (url) {
    return <Link href={url} passHref>{inner}</Link>;
  }

  return inner;
};

export default BigAuthor;
