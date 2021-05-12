import React, { FunctionComponent } from "react";
import AnimationSection from "./AnimationSection";
import FadeIn from "./FadeIn";

/**
 * Section with a paragraph.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const ParagraphSection: FunctionComponent = ({
  children,
}) => (
  <AnimationSection>
    <FadeIn>
      <p className="text-2xl md:text-4xl font-semibold tracking-tight max-w-xl">
        {children}
      </p>
    </FadeIn>
  </AnimationSection>
);

export default ParagraphSection;
