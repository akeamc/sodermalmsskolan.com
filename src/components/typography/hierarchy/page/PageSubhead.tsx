/* eslint-disable jsx-a11y/heading-has-content */
import React, { FunctionComponent } from "react";
import { HeadingProps } from "../../../atomics/headings/types";
import getTextSize from "../../getTextSize";

export type PageSubheadProps = HeadingProps;

const PageSubhead: FunctionComponent<PageSubheadProps> = (props) => (
  <h1
    css={{
      fontSize: getTextSize(14) / 2,
      margin: 0,
      lineHeight: 1.5,
      fontWeight: 400,
      letterSpacing: "-0.05em",
    }}
    {...props}
  />
);

export default PageSubhead;
