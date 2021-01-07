import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../../styles/overrides";

/**
 * Some bit of text that is REALLY important.
 *
 * @param props
 */
const Emphasis: FunctionComponent<HTMLElementProps<HTMLElement>> = (
  props,
) => (
  <em
    css={{
      color: "var(--color-text-primary)",
      fontStyle: "italic",
    }}
    {...props}
  />
);

export default Emphasis;
