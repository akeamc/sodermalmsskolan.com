export type Breakpoint = "small" | "medium" | "large" | "extraLarge";

export interface Breakpoints extends Record<Breakpoint, number> {
  small: number;
  medium: number;
  large: number;
  extraLarge: number;
}

/**
 * Breakpoints.
 */
export const breakpoints: Breakpoints = {
  small: 480,
  medium: 768,
  large: 1024,
  extraLarge: 1200,
};

/**
 * Generate a CSS media property with a single function! Incredible, right?
 * Returns `@media screen and (min-width: <width>px)`.
 *
 * @param {number} minWidth CSS `min-width` (with `px` as the unit).
 *
 * @returns {string} The media query.
 *
 * @deprecated
 */
export const media = (minWidth: number): string => (
  `@media screen and (min-width: ${minWidth}px)`
);
