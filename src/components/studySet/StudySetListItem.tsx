import Link from "next/link";
import React, { FunctionComponent } from "react";
import { useStudySet } from "../../lib/quizlet/structures/client/StudySet";
import { breakpoints, media } from "../../styles/breakpoints";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface StudySetListItemProps {
  id: string;
}

/**
 * List item displaying study set details.
 *
 * @param {React.PropsWithChildren<StudySetListItemProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered `<li />`.
 */
const StudySetListItem: FunctionComponent<StudySetListItemProps> = ({
  id,
}) => {
  const { data } = useStudySet({
    id,
  });

  const title = data?.details?.title;
  const description = data?.details?.description;
  const author = data?.details?.author;

  const inner = (
    <a css={{
      padding: "1rem 0",
      textDecoration: "none",
      color: "var(--color-text-tertiary)",
      fontSize: "0.875rem",
      display: "flex",
      alignItems: "center",

      [media(breakpoints.medium)]: {
        padding: "0.5rem 0",
        alignItems: "normal",
      },

      "&:hover": {
        strong: {
          textDecoration: "underline",
        },
      },
    }}
    >
      <div css={{
        flex: 1,

        [media(breakpoints.medium)]: {
          display: "flex",
        },
      }}
      >
        <strong css={{
          color: "var(--color-text-primary)",
          fontWeight: 600,
          marginBottom: "0.5rem",

          [media(breakpoints.medium)]: {
            flex: "0 0 16rem",
            marginBottom: 0,
            marginRight: "0.75rem",
          },
        }}
        >
          {typeof title !== "undefined" ? title : <InlineSkeleton width="100%" />}
        </strong>
        <div>
          {typeof description !== "undefined" ? (description || "—") : <InlineSkeleton width="20em" />}
        </div>
      </div>
      <div css={{
        float: "right",
        marginLeft: "0.5rem",

        [media(breakpoints.medium)]: {
          marginLeft: "auto",
        },
      }}
      >
        {typeof data !== "undefined" ? author : <InlineSkeleton width="4em" />}
      </div>
    </a>
  );

  return (
    <li css={{
      listStyle: "none",
      borderBottom: "1px solid var(--color-border-primary)",

      [media(breakpoints.medium)]: {
        borderBottom: 0,
      },
    }}
    >
      {data?.url ? (
        <Link href={data?.url} passHref>
          {inner}
        </Link>
      ) : inner}
    </li>
  );
};

export default StudySetListItem;
