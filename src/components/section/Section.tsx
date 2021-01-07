import React, { FunctionComponent } from "react";
import Container from "../Container";
import SectionHeader, { SectionHeaderProps } from "../header/Section";

export interface SectionProps {
  header?: SectionHeaderProps;
}

const Section: FunctionComponent<SectionProps> = ({
  children,
  header,
  ...props
}) => (
  <section
    css={{
      padding: "var(--section-padding)",
      backgroundColor: "var(--color-bg-primary)",
    }}
    {...props}
  >
    <Container>
      {header ? <SectionHeader {...header} /> : null}
      {children}
    </Container>
  </section>
);

export default Section;
