import { Theme } from "@emotion/react";
import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../../styles/overrides";

/**
 * Some bit of text that is REALLY important.
 */
const Emphasis: FunctionComponent<HTMLElementProps<HTMLElement>> = (
  props,
) => (
  <em
    css={(theme: Theme) => ({
      color: theme.color.text.primary,
      fontStyle: "italic",
    })}
    {...props}
  />
);

export default Emphasis;
