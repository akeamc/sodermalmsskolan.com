import React, { FunctionComponent, ReactNode } from "react";
import PageHeading from "../atomics/headings/PageHeading";
import Section, { SectionProps } from "../section/Section";

export interface HeaderSectionProps extends SectionProps {
  title: ReactNode;
}

const HeaderSection: FunctionComponent<HeaderSectionProps> = ({
  title,
  ...sectionProps
}) => (
  <Section {...sectionProps}>
    <PageHeading>{title}</PageHeading>
  </Section>
)

export default HeaderSection;
