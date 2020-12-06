import React, { FunctionComponent, ReactNode } from "react";
import { HeroHeading, SmallHeading } from "../text/headings";

export interface SectionHeaderProps {
  superTitle?: ReactNode;
  title: ReactNode;
}

const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  superTitle,
  title,
}) => {
  return (
    <div
      css={{
        marginBottom: "4rem",
      }}
    >
      {superTitle ? <SmallHeading>{superTitle}</SmallHeading> : null}
      <HeroHeading>{title}</HeroHeading>
    </div>
  );
};

export default SectionHeader;
