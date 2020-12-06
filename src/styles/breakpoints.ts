export interface Breakpoints<T> extends Record<string, T> {
  medium: T;
  large: T;
}

/**
 * Breakpoints.
 */
export const breakpoints: Breakpoints<number> = {
  medium: 640,
  large: 1024,
};

/**
 * Generate a CSS media property with a single function! Incredible, right? Returns `@media screen and (min-width: <width>px)`.
 *
 * @param minWidth CSS `min-width`.
 */
export function media(minWidth: number): string {
  return `@media screen and (min-width: ${minWidth}px)`;
}
