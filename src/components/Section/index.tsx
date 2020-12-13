import {
  css, SerializedStyles, ThemeProvider, useTheme,
} from "@emotion/react";
import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";
import darkTheme from "../../styles/theme/dark";
import Container from "../Container";
import { LowerDivider, UpperDivider } from "../divider";
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
  upperDivider?: boolean;
  lowerDivider?: boolean;
}

export interface SectionProps extends InnerSectionProps {
  dark?: boolean;
}

const InnerSection: FunctionComponent<InnerSectionProps> = ({
  children,
  header,
  upperDivider,
  lowerDivider,
  ...props
}) => {
  const theme = useTheme();

  return (
    <>
      {upperDivider ? <UpperDivider /> : null}
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
      {lowerDivider ? <LowerDivider /> : null}
    </>
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
