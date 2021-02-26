import React, { FunctionComponent } from "react";
import { CSSDistance } from "../../styles/types/distance";

export type ContainerWidth = "wide" | "normal" | "narrow";

/**
 * Convert `ContainerWidth` to a CSS width.
 *
 * @param {ContainerWidth} width Container width literal.
 *
 * @returns {CSSDistance} The evaluated width, in CSS.
 */
export const evaluateContainerWidth = (width: ContainerWidth): CSSDistance => {
  switch (width) {
    case "narrow": {
      return "840px";
    }
    case "wide": {
      return "1280px";
    }
    default: {
      return "1024px";
    }
  }
};

export interface ContainerProps {
  width?: ContainerWidth,
}

/**
 * A container to contain contained content.
 *
 * @param {React.PropsWithChildren<ContainerProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered container.
 */
const Container: FunctionComponent<ContainerProps> = ({
  width = "normal",
  ...props
}) => (
  <div
    css={{
      maxWidth: evaluateContainerWidth(width),
      margin: "0 auto",
      padding: "0 var(--page-gutter)",
    }}
    {...props}
  />
);

export default Container;
