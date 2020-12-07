export interface Breakpoints<T> extends Record<string, T> {
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
 * @param minWidth CSS `min-width`.
 */
export function media(minWidth: number): string {
  return `@media screen and (min-width: ${minWidth}px)`;
}
