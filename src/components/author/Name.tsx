import Link from "next/link";
import React, { FunctionComponent } from "react";
import Author from "../../lib/ghost/author";
import { useAuthorUrl } from "../../lib/ghost/hooks/author";
import InlineSkeleton from "../skeleton/InlineSkeleton";

/**
 * The clickable full name of an author.
 */
const AuthorName: FunctionComponent<{author: Author}> = ({ author }) => {
  const url = useAuthorUrl(author?.slug);

  const inner = (
    <a css={{
      color: "inherit",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    }}
    >
      {author?.name || <InlineSkeleton width="4em" />}
    </a>
  );

  if (url) {
    return <Link href={url} passHref>{inner}</Link>;
  }

  return inner;
};

export default AuthorName;
