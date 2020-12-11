import React, { FunctionComponent, ReactNode } from "react";
import CardGrid from "../grid/CardGrid";
import Section, { SectionProps } from "../Section";

export interface CardGridSectionProps extends SectionProps {
  bottomText?: ReactNode;
}

const CardGridSection: FunctionComponent<CardGridSectionProps> = ({
  bottomText,
  children,
  ...sectionProps
}) => (
  <Section
    {...sectionProps}
  >
    <CardGrid>
      {children}
    </CardGrid>
    {bottomText ? (
      <div css={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
      }}
      >
        {bottomText}
      </div>
    ) : null}
  </Section>
);

export default CardGridSection;
