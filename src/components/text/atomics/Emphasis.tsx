import React, { FunctionComponent } from "react";
import { HTMLElementProps } from "../../../styles/types/overrides";

export type EmphasisProps = HTMLElementProps<HTMLElement>;

/**
 * Some bit of text that is REALLY important.
 *
 * @param {React.PropsWithChildren<EmphasisProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered `<em>` tag.
 */
const Emphasis: FunctionComponent<EmphasisProps> = (
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
