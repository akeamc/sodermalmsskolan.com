import React, { FunctionComponent } from "react";
import { LimitParam } from "../../lib/ghost/common";
import { useAuthors } from "../../lib/ghost/hooks/author";
import { breakpoints, media } from "../../styles/breakpoints";
import Section, { SectionProps } from "../Section";
import BigAuthor from "./BigAuthor";

export interface AuthorSectionProps extends SectionProps {
  limit?: LimitParam;
}

const AuthorSection: FunctionComponent<AuthorSectionProps> = ({ limit, ...sectionProps }) => {
  const { data } = useAuthors(limit);

  const skeletonAuthors = typeof limit === "number" ? limit : 3;

  return (
    <Section
      header={{
        superTitle: "Författare",
        title: "Alla våra författare",
      }}
      {...sectionProps}
    >
      <div css={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      >
        {(data || new Array(skeletonAuthors).fill(null))
          .map(((author, index) => (
            <div
              key={author?.id || index}
              css={{
                flex: "0 0 50%",
                padding: "0.5rem",
                boxSizing: "border-box",

                [media(breakpoints.medium)]: {
                  flexBasis: "calc(100% / 3)",
                },

                [media(breakpoints.large)]: {
                  flexBasis: "25%",
                },
              }}
            >
              <BigAuthor author={author} />
            </div>
          )))}
      </div>
    </Section>
  );
};

export default AuthorSection;
