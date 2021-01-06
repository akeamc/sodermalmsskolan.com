import React, { FunctionComponent, ReactNode } from "react";
import { breakpoints, media } from "../../styles/breakpoints";

export interface CardGridProps {
  overlay?: ReactNode;
}

/**
 * A grid of cards.
 *
 * @param root0
 * @param root0.children
 * @param root0.overlay
 */
const CardGrid: FunctionComponent<CardGridProps> = ({ children, overlay, ...rest }) => (
  <div
    css={{
      position: "relative",
    }}
    {...rest}
  >
    <div css={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
      position: "relative",
      opacity: overlay ? 0.75 : undefined,

      "&::before": overlay ? {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        content: "\"\"",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0), var(--color-bg-primary))",
      } : undefined,

      [media(breakpoints.medium)]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },

      [media(breakpoints.large)]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    }}
    >
      {children}
    </div>
    {overlay ? (
      <div css={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      >
        {overlay}
      </div>
    ) : null}
  </div>
);

export default CardGrid;
