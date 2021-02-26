import { CSSDistance } from "./types/distance";

export type Breakpoint = "small" | "medium" | "large" | "extraLarge";

export interface Breakpoints<T> extends Record<Breakpoint, T> {
  small: T;
  medium: T;
  large: T;
  extraLarge: T;
}

/**
 * Breakpoints.
 */
export const breakpoints: Breakpoints<number> = {
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
 */
export const media = (minWidth: number): string => (
  `@media screen and (min-width: ${minWidth}px)`
);
