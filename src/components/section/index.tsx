import { css, ThemeProvider, useTheme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import darkTheme from "../../styles/theme/dark";
import Container from "../container";
import SectionHeader, { SectionHeaderProps } from "../header/section";

export const sectionPadding = css({
  padding: "10.75rem 0 3rem",
});

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
        sectionPadding,
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
  } else {
    return <InnerSection {...props} />;
  }
};

export default Section;
