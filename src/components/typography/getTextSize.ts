/**
 * Function used to get the text size of a particular index based on the
 * [scale equation from Carbon Design System](https://www.carbondesignsystem.com/guidelines/typography/overview#scale).
 *
 * @param {number} n Input index.
 *
 * @returns {number} The text size in pixels (`px`).
 */
const getTextSize = (n: number): number => {
  if (n === 1) {
    return 12;
  }

  if (n > 1) {
    return getTextSize(n - 1) + (Math.floor((n - 2) / 4) + 1) * 2;
  }

  throw new Error("n must be an integer greater than or equal to 1.");
};

export default getTextSize;
