/**
 * Capitalize a string. Only modifies the first character.
 *
 * @param {string} input The string to be capitalized.
 *
 * @returns {string} The capitalized string.
 */
const capitalize = (input?: string): string => {
  if (typeof input !== "string") {
    return undefined;
  }

  return input[0].toLocaleUpperCase() + input.slice(1);
};

export default capitalize;
