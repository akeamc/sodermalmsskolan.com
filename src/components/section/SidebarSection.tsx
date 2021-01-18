import React, { FunctionComponent, ReactNode } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import Section, { SectionProps } from "./Section";

export interface SidebarSectionProps extends SectionProps {
  main: ReactNode;
  sidebar: ReactNode;
  sidebarTitle: ReactNode;
}

/**
 * Section with a sidebar.
 *
 * @param {React.PropsWithChildren<SidebarSectionProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered section.
 */
const SidebarSection: FunctionComponent<SidebarSectionProps> = ({
  main, sidebar, sidebarTitle, ...sectionProps
}) => (
  <Section
    containerProps={{
      width: "wide",
    }}
    {...sectionProps}
  >
    <div css={{
      [media(breakpoints.large)]: {
        display: "flex",
      },
    }}
    >
      <div css={{
        [media(breakpoints.large)]: {
          marginRight: "2rem",
          flex: "1",
        },

        [media(breakpoints.extraLarge)]: {
          marginRight: "4rem",
        },
      }}
      >
        {main}
      </div>
      <aside css={{
        marginTop: "2rem",

        [media(breakpoints.large)]: {
          width: "20rem",
          marginTop: 0,
        },

        [media(breakpoints.extraLarge)]: {
          width: "24rem",
        },
      }}
      >
        <h3 css={{
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: "0 0 1rem",
          lineHeight: 1.5,
          color: "var(--color-text-primary)",
          textAlign: "center",

          [media(breakpoints.large)]: {
            fontSize: "1rem",
            textAlign: "initial",
          },
        }}
        >
          {sidebarTitle}
        </h3>
        {sidebar}
      </aside>
    </div>
  </Section>
);

export default SidebarSection;
