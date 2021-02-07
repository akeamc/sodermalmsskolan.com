import Link from "next/link";
import React, { FunctionComponent } from "react";
import Author, { getAuthorPath } from "../../lib/ghost/author";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface AuthorNameProps {
  author: Author;
}

/**
 * The clickable full name of an author.
 *
 * @param {React.PropsWithChildren<AuthorNameProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered name.
 */
const AuthorName: FunctionComponent<AuthorNameProps> = ({ author }) => {
  const url = getAuthorPath(author?.slug);

  const inner = (
    <a css={{
      color: "inherit",
      textDecoration: "none",

      "&:hover": {
        textDecoration: "underline",
      },
    }}
    >
      {author?.name ?? <InlineSkeleton width="4em" />}
    </a>
  );

  if (url) {
    return <Link href={url} passHref>{inner}</Link>;
  }

  return inner;
};

export default AuthorName;
