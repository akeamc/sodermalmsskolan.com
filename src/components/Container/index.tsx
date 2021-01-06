import React, { FunctionComponent } from "react";

/**
 * A container to contain contained content.
 *
 * @param {any} props Generic props.
 * @returns {React.ReactElement} The rendered container.
 */
const Container: FunctionComponent = (props) => (
  <div
    css={{
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 var(--page-gutter)",
    }}
    {...props}
  />
);

export default Container;
