import { CSSObject } from "@emotion/react";
import { breakpoints, media } from "./breakpoints";

const spacingVariables: CSSObject = {
  "--page-gutter": "1.5rem",

  "--section-padding": "6rem 0 3rem",
  "--header-padding": "var(--page-gutter) 0 3rem",

  [media(breakpoints.medium)]: {
    "--page-gutter": "2rem",
  },

  [media(breakpoints.large)]: {
    "--section-padding": "8rem 0 3rem",
    "--header-padding": "8rem 0 3rem",
  },
};

export default spacingVariables;
