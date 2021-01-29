/**
 * Finds the end of the math.
 *
 * @param {string} rightDelimeter The right delimeter.
 * @param {string} text Text to scan.
 * @param {number} startIndex Starting index.
 *
 * @returns {number} The end index.
 */
const findEndOfMath = (rightDelimeter: string, text: string, startIndex = 0): number => {
  let index = startIndex;
  let braceLevel = 0;

  const delimLength = rightDelimeter.length;

  while (index < text.length) {
    const character = text[index];

    if (
      braceLevel <= 0
      && text.slice(index, index + delimLength) === rightDelimeter
    ) {
      return index;
    } if (character === "\\") {
      index += 1;
    } else if (character === "{") {
      braceLevel += 1;
    } else if (character === "}") {
      braceLevel -= 1;
    }

    index += 1;
  }

  return -1;
};

export default findEndOfMath;
