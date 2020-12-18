import { Theme } from "@emotion/react";
import React, { FunctionComponent, ReactNode } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import Section, { SectionProps } from "./Section";

export interface SidebarSectionProps extends SectionProps {
  main: ReactNode;
  sidebar: ReactNode;
  sidebarTitle: ReactNode;
}

const SidebarSection: FunctionComponent<SidebarSectionProps> = ({
  main, sidebar, sidebarTitle, ...sectionProps
}) => (
  <Section {...sectionProps}>
    <div css={{
      [media(breakpoints.large)]: {
        display: "flex",
      },
    }}
    >
      <div css={{
        [media(breakpoints.large)]: {
          marginRight: "5rem",
          flex: "1",
        },
      }}
      >
        {main}
      </div>
      <aside css={{
        marginTop: "2rem",

        [media(breakpoints.large)]: {
          width: "400px",
          marginTop: 0,
        },
      }}
      >
        <h3 css={(theme: Theme) => ({
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: "0 0 1rem",
          lineHeight: 1.5,
          color: theme.color.text.primary,
          textAlign: "center",

          [media(breakpoints.large)]: {
            fontSize: "1rem",
            textAlign: "initial",
          },
        })}
        >
          {sidebarTitle}
        </h3>
        {sidebar}
      </aside>
    </div>
  </Section>
);

export default SidebarSection;
