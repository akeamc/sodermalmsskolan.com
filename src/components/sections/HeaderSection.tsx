import React, { FunctionComponent, ReactNode } from "react";
import Section, { SectionProps } from "../section/Section";
import PageHeading from "../typography/hierarchy/page/PageHeading";
import PageSubhead from "../typography/hierarchy/page/PageSubhead";

export interface HeaderSectionProps extends SectionProps {
  headline: ReactNode;
  subhead?: ReactNode;
}

const HeaderSection: FunctionComponent<HeaderSectionProps> = ({
  headline,
  subhead,
  ...sectionProps
}) => (
  <Section {...sectionProps}>
    <PageHeading>{headline}</PageHeading>
    {subhead ? <PageSubhead>{subhead}</PageSubhead> : null}
  </Section>
);

export default HeaderSection;
