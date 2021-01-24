import Link from "next/link";
import React, { FunctionComponent, memo } from "react";
import { useStudySet } from "../../lib/quizlet/structures/client/StudySet";
import { StudySetDetails } from "../../lib/quizlet/structures/shared/StudySet";
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

  const details = data?.details ?? ({} as StudySetDetails);

  const {
    title, description, author, terms,
  } = details;

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
        display: "flex",
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
          marginRight: "0.75rem",
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
        <div css={{
          flex: 1,
          marginRight: "0.75rem",
        }}
        >
          {typeof description !== "undefined" ? (description ?? "—") : <InlineSkeleton width="20em" />}
        </div>
        <div>
          {typeof terms !== "undefined" ? (
            <>
              {terms}
              {" "}
              termer
            </>
          ) : <InlineSkeleton width="4em" />}
        </div>
      </div>
      <div css={{
        float: "right",
        marginLeft: "0.5rem",

        [media(breakpoints.medium)]: {
          marginLeft: "auto",
          flex: "0 0 10rem",
          textAlign: "right",
        },
      }}
      >
        {typeof data !== "undefined" ? author : <InlineSkeleton />}
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

export default memo(StudySetListItem);
