import React, { FunctionComponent } from "react";
import { breakpoints, media } from "../../styles/breakpoints";

/**
 * A grid of cards.
 */
const CardGrid: FunctionComponent = (props) => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",

      [media(breakpoints.medium)]: {
        gridTemplateColumns: "repeat(2, 1fr)",
      },

      [media(breakpoints.large)]: {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
    }}
    {...props}
  />
);

export default CardGrid;
