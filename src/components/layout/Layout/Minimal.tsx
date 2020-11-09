import React from "react";
import { LayoutProps } from ".";
import { DefaultHead } from "../Head/Metadata";

export const MinimalLayout: React.FunctionComponent<LayoutProps> = ({
  children,
  metadata,
}) => {
  return (
    <>
      <DefaultHead metadata={metadata} />
      <div>{children}</div>
    </>
  );
};
