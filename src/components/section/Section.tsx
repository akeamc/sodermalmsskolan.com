import React, { FunctionComponent } from "react";
import Container, { ContainerProps } from "../Container";
import SectionHeader, { SectionHeaderProps } from "../header/Section";

export interface SectionProps {
  header?: SectionHeaderProps;
  containerProps?: ContainerProps;
}

/**
 * The default way to place elements on the site, complete with padding.
 *
 * @param {React.PropsWithChildren<SectionProps>} props Section props.
 *
 * @returns {React.ReactElement} The rendered section.
 */
const Section: FunctionComponent<SectionProps> = ({
  children,
  header,
  containerProps,
  ...props
}) => (
  <section
    css={{
      padding: "var(--section-padding)",
      backgroundColor: "var(--color-bg-primary)",
    }}
    {...props}
  >
    <Container {...containerProps}>
      {header ? <SectionHeader {...header} /> : null}
      {children}
    </Container>
  </section>
);

export default Section;
