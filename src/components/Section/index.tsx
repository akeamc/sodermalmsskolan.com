import {
  css, SerializedStyles, useTheme,
} from "@emotion/react";
import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import Container from "../Container";
import SectionHeader, { SectionHeaderProps } from "../header/Section";

export const sectionPaddingStyles: Record<string, SerializedStyles> = {
  top: css({
    paddingTop: "6rem",

    [media(breakpoints.large)]: {
      paddingTop: "8rem",
    },
  }),
  bottom: css({
    paddingBottom: "3rem",
  }),
};

export interface SectionProps {
  header?: SectionHeaderProps;
}

const Section: FunctionComponent<SectionProps> = ({
  children,
  header,
  ...props
}) => {
  const theme = useTheme();

  return (
    <section
      css={[
        sectionPaddingStyles.top,
        sectionPaddingStyles.bottom,
        {
          backgroundColor: theme.color.background.primary,
        },
      ]}
      {...props}
    >
      <Container>
        {header ? <SectionHeader {...header} /> : null}
        {children}
      </Container>
    </section>
  );
};

export default Section;
