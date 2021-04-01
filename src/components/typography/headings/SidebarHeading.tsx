import React, { FunctionComponent } from "react";

/**
 * Heading for sidebars.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
const SidebarHeading: FunctionComponent = (props) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3
    css={{
      margin: "2em 0 1em 0",
      fontWeight: 700,
      letterSpacing: "-0.019em",
      fontSize: 24,
    }}
    {...props}
  />
);

export default SidebarHeading;
