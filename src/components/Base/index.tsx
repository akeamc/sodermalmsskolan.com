import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import SiteHead, { SiteMetadata } from "../head";

export interface BaseProps {
  metadata?: SiteMetadata;
}

const Base: FunctionComponent<BaseProps> = ({ metadata, children }) => (
  <>
    <SiteHead metadata={metadata} />
    <main
      css={(theme: Theme) => ({
        backgroundColor: theme.color.background,
        color: theme.color.text.primary,
      })}
    >
      {children}
    </main>
  </>
);

export default Base;
