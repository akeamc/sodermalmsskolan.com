import { Delimeter, SplitFragment } from "./splitAtDelimeters";
import splitWithDelimiters from "./splitWithDelimeters";

/**
 * Extract KaTeX from a string.
 *
 * @param {string} text Input text.
 *
 * @returns {SplitFragment[]} The extracted KaTeX (`null` if none is to be found).
 */
const extractKatex = (text: string): SplitFragment[] => {
  const delimeters: Delimeter[] = [
    { left: "$$", right: "$$", display: true },
    { left: "\\(", right: "\\)", display: false },
  ];

  const data = splitWithDelimiters(text, delimeters);

  if (data.length === 1 && data[0].type === "text") {
    // There is no formula in the text.
    return null;
  }

  return data;
};

export default extractKatex;
