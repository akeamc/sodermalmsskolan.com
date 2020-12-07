/* eslint no-constant-condition: ["error", { "checkLoops": false }] */
import katex from "katex";
import "katex/dist/contrib/mhchem.js";

interface Delimeter {
  left: string;
  right: string;
  display: boolean;
}

type Delimeters = Delimeter[];

const findEndOfMath = function (delimiter: string, text: string, startIndex) {
  // Adapted from
  // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
  let index = startIndex;
  let braceLevel = 0;

  const delimLength = delimiter.length;

  while (index < text.length) {
    const character = text[index];

    if (
      braceLevel <= 0
      && text.slice(index, index + delimLength) === delimiter
    ) {
      return index;
    } if (character === "\\") {
      index++;
    } else if (character === "{") {
      braceLevel++;
    } else if (character === "}") {
      braceLevel--;
    }

    index++;
  }

  return -1;
};

enum SplitFragmentType {
  Text,
  Math,
}

interface SplitFragment {
  type: SplitFragmentType;
  data: string;
  display?: boolean;
}

const splitAtDelimiters = function (
  startData,
  leftDelim: string,
  rightDelim: string,
  display: boolean,
): SplitFragment[] {
  const finalData = [];

  for (let i = 0; i < startData.length; i++) {
    if (startData[i].type === SplitFragmentType.Text) {
      const text = startData[i].data;

      let lookingForLeft = true;
      let currIndex = 0;
      let nextIndex;

      nextIndex = text.indexOf(leftDelim);
      if (nextIndex !== -1) {
        currIndex = nextIndex;
        finalData.push({
          type: SplitFragmentType.Text,
          data: text.slice(0, currIndex),
        });
        lookingForLeft = false;
      }

      while (true) {
        if (lookingForLeft) {
          nextIndex = text.indexOf(leftDelim, currIndex);
          if (nextIndex === -1) {
            break;
          }

          finalData.push({
            type: SplitFragmentType.Text,
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
            type: SplitFragmentType.Math,
            data: text.slice(currIndex + leftDelim.length, nextIndex),
            rawData: text.slice(currIndex, nextIndex + rightDelim.length),
            display,
          });

          currIndex = nextIndex + rightDelim.length;
        }

        lookingForLeft = !lookingForLeft;
      }

      finalData.push({
        type: SplitFragmentType.Text,
        data: text.slice(currIndex),
      });
    } else {
      finalData.push(startData[i]);
    }
  }

  return finalData;
};

const splitWithDelimiters = function (text, delimiters: Delimeters) {
  let data: SplitFragment[] = [{ type: SplitFragmentType.Text, data: text }];
  for (let i = 0; i < delimiters.length; i++) {
    const delimiter = delimiters[i];
    data = splitAtDelimiters(
      data,
      delimiter.left,
      delimiter.right,
      delimiter.display || false,
    );
  }
  return data;
};

/**
 * NOTE: Don't forget to include the KaTeX CSS stylesheet.
 *
 */
export const renderMathInText = function (text: string): string {
  const options = {
    delimeters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false },
    ],
  };

  const data = splitWithDelimiters(text, options.delimeters);

  if (data.length === 1 && data[0].type === SplitFragmentType.Text) {
    // There is no formula in the text.
    // Let's return null which means there is no need to replace
    // the current text node with a new one.
    return null;
  }

  const output = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === SplitFragmentType.Text) {
      output.push(data[i].data);
    } else {
      const math = data[i].data;
      try {
        output.push(
          katex.renderToString(math, {
            displayMode: data[i].display,
            output: "html",
          }),
        );
      } catch (e) {
        console.warn(e);
        continue;
      }
    }
  }

  return output.join("");
};
