import classNames from "classnames";
import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes } from "react";
import FadeIn from "./FadeIn";

export type SectionHeadingProps = DetailedHTMLProps<
HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement
>;

/**
 * A heading for sections.
 *
 * @param {React.PropsWithChildren<SectionHeadingProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered heading.
 */
const SectionHeading: FunctionComponent<SectionHeadingProps> = ({
  className,
  ...props
}) => (
  <FadeIn>
    {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
    <h2
      className={classNames("text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight w-2/3 sm:w-1/2 lg:w-1/3", className)}
      {...props}
    />
  </FadeIn>
);

export default SectionHeading;
