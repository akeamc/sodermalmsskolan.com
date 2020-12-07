import React, { FunctionComponent, ReactNode } from "react";
import { SectionHeading, SmallHeading } from "../text/headings";

export interface SectionHeaderProps {
  superTitle?: ReactNode;
  title: ReactNode;
}

const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  superTitle,
  title,
}) => (
  <div
    css={{
      marginBottom: "4rem",
    }}
  >
    {superTitle ? <SmallHeading>{superTitle}</SmallHeading> : null}
    <SectionHeading>{title}</SectionHeading>
  </div>
);

export default SectionHeader;
