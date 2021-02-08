import React, { FunctionComponent } from "react";

/**
 * Component used to mock the `next/head` for testing purposes.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} The rendered `<Head />`.
 */
const MockedHead: FunctionComponent = ({
  children,
}) => (
  <>
    {children}
  </>
);

export default MockedHead;
