import {
  css, SerializedStyles, ThemeProvider, useTheme,
} from "@emotion/react";
import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import darkTheme from "../../styles/theme/dark";
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

export interface InnerSectionProps {
  header?: SectionHeaderProps;
}

export interface SectionProps extends InnerSectionProps {
  dark?: boolean;
}

const InnerSection: FunctionComponent<InnerSectionProps> = ({
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
          backgroundColor: theme.color.background,
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

const Section: FunctionComponent<SectionProps> = ({
  dark = false,
  ...props
}) => {
  if (dark) {
    return (
      <ThemeProvider theme={darkTheme}>
        <InnerSection {...props} />
      </ThemeProvider>
    );
  }
  return <InnerSection {...props} />;
};

export default Section;
