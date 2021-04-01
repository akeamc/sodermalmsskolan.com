import React, { FunctionComponent } from "react";

/**
 * Time!
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Rendered time.
 */
const Time: FunctionComponent = (props) => (
  <time
    css={{
      fontFeatureSettings: "\"ss01\", \"tnum\"",
    }}
    {...props}
  />
);

export default Time;
