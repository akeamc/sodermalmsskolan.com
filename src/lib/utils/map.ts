/**
 * Map a number from one range to another.
 *
 * @param {number} value The value to be mapped.
 * @param {number} x1 Lower input bounds.
 * @param {number} y1 Higher input bounds.
 * @param {number} x2 Lower output bounds.
 * @param {number} y2 Higher output bounds.
 *
 * @returns {number} The mapped value.
 */
const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export default map;
