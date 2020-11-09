import React from "react";
import { Footer } from "../Footer";
import { DefaultHead } from "../Head/Metadata";
import { LayoutProps } from ".";

export const DefaultLayout: React.FunctionComponent<LayoutProps> = ({
  children,
  metadata = {},
}) => {
  return (
    <>
      <DefaultHead metadata={metadata} />
      <div>
        {children}
        <Footer />
      </div>
    </>
  );
};
