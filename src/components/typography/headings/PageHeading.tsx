import React, { FunctionComponent } from "react";

/**
 * Main page heading.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
const PageHeading: FunctionComponent = (props) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h1
    css={{
      margin: "0 0 1em",
      fontSize: 36,
      letterSpacing: "-0.022em",
      lineHeight: 1.25,
    }}
    {...props}
  />
);

export default PageHeading;
