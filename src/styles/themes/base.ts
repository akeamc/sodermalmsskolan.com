import { CSSObject } from "@emotion/react";
import { transparentize } from "polished";

const baseTheme: CSSObject = {
  "--accents-1": "#fafafa",
  "--accents-2": "#eaeaea",
  "--accents-3": "#999999",
  "--accents-4": "#888888",
  "--accents-5": "#666666",
  "--accents-6": "#444444",
  "--accents-7": "#333333",
  "--accents-8": "#111111",

  "--color-bg-primary": "#ffffff",
  "--color-bg-secondary": "#fafafa",

  "--color-text-primary": "#000000",
  "--color-text-secondary": "#404040",
  "--color-text-tertiary": "#808080",
  "--color-text-danger": "#cb2431",

  "--color-highlight": "#4969ed",
  "--color-highlight-light": "#607cef",

  "--shadow-color": transparentize(0.8, "#000000"),

  "--shadow-small": "0 2px 10px 0 var(--shadow-color)",
  "--shadow-large": "0 60px 120px -10px var(--shadow-color)",

  "--color-border-primary": "var(--accents-2)",
  "--color-border-danger": "#d73a49",

  "--link-color": "var(--color-highlight)",

  "--skeleton-base": "var(--accents-2)",
  "--skeleton-highlight": "var(--accents-1)",

  "--segmented-control-track": "var(--accents-2)",
  "--segmented-control-indicator": "var(--color-bg-primary)",

  "--select-selected-background": transparentize(0.9, "#4969ed"),

  "--navbar-height": "3.75rem",
};

export default baseTheme;
