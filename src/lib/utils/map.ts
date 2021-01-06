/**
 * Map a number from one range to another.
 *
 * @param value The value to be mapped.
 * @param x1 Lower input bounds.
 * @param y1 Higher input bounds.
 * @param x2 Lower output bounds.
 * @param y2 Higher output bounds.
 *
 * @returns The mapped value.
 */
const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export default map;
