import React, { FunctionComponent, ReactNode } from "react";
import { PromoSectionHeading, SectionHeading, SmallHeading } from "../text/headings";

export interface SectionHeaderProps {
  superTitle?: ReactNode;
  title: ReactNode;

  /**
   * Whether or not this is a promotional section, used for example on the front page.
   */
  promo?: boolean;
}

/**
 * @param root0
 * @param root0.superTitle
 * @param root0.title
 * @param root0.promo
 * @deprecated Deprecated in favor of more *creative* headers.
 */
const SectionHeader: FunctionComponent<SectionHeaderProps> = ({
  superTitle,
  title,
  promo = false,
}) => (
  <div
    css={{
      marginBottom: "4rem",
    }}
  >
    {superTitle ? <SmallHeading>{superTitle}</SmallHeading> : null}
    {promo
      ? <PromoSectionHeading>{title}</PromoSectionHeading>
      : <SectionHeading>{title}</SectionHeading>}
  </div>
);

export default SectionHeader;
