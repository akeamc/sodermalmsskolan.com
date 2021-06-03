import React, { FunctionComponent } from "react";

/**
 * A narrow container with vertical margin.
 *
 * @param {React.PropsWithChildren} props Generic props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const AnimationSection: FunctionComponent = ({
  children,
}) => (
  <div className="my-16 container">
    <div className="md:mx-32 lg:mx-48">
      {children}
    </div>
  </div>
);

export default AnimationSection;
