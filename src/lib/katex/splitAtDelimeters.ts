import findEndOfMath from "./findEndOfMath";

export type SplitFragmentKind = "text" | "math";

export interface SplitFragment {
  type: SplitFragmentKind;
  data: string;
  display?: boolean;
}

export interface Delimeter {
  left: string;
  right: string;
  display: boolean;
}

/**
 * Split math at delimeters.
 *
 * @param {SplitFragment[]} startData Initial data.
 * @param {string} leftDelim Left delimeter.
 * @param {string} rightDelim Right delimeter.
 * @param {boolean} display Whether to run in display mode.
 *
 * @returns {SplitFragment[]} The fragments.
 */
const splitAtDelimiters = (
  startData: SplitFragment[],
  leftDelim: string,
  rightDelim: string,
  display: boolean,
): SplitFragment[] => {
  const finalData: SplitFragment[] = [];

  for (let i = 0; i < startData.length; i += 1) {
    if (startData[i].type === "text") {
      const text = startData[i].data;

      let lookingForLeft = true;
      let currIndex = 0;
      let nextIndex;

      nextIndex = text.indexOf(leftDelim);
      if (nextIndex !== -1) {
        currIndex = nextIndex;
        finalData.push({
          type: "text",
          data: text.slice(0, currIndex),
        });
        lookingForLeft = false;
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (lookingForLeft) {
          nextIndex = text.indexOf(leftDelim, currIndex);
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: "text",
            data: text.slice(currIndex, nextIndex),
          });

          currIndex = nextIndex;
        } else {
          nextIndex = findEndOfMath(
            rightDelim,
            text,
            currIndex + leftDelim.length,
          );
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: "math",
            data: text.slice(currIndex + leftDelim.length, nextIndex),
            display,
          });

          currIndex = nextIndex + rightDelim.length;
        }

        lookingForLeft = !lookingForLeft;
      }

      const remaining = text.slice(currIndex);

      if (remaining.length > 0) {
        finalData.push({
          type: "text",
          data: remaining,
        });
      }
    } else {
      finalData.push(startData[i]);
    }
  }

  return finalData;
};

export default splitAtDelimiters;
