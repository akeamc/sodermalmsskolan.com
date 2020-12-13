interface Delimeter {
  left: string;
  right: string;
  display: boolean;
}

type Delimeters = Delimeter[];

const findEndOfMath = (delimiter: string, text: string, startIndex) => {
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

type SplitFragmentKind = "text" | "math";

interface SplitFragment {
  type: SplitFragmentKind;
  data: string;
  display?: boolean;
}

const splitAtDelimiters = (
  startData,
  leftDelim: string,
  rightDelim: string,
  display: boolean,
): SplitFragment[] => {
  const finalData = [];

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
            rawData: text.slice(currIndex, nextIndex + rightDelim.length),
            display,
          });

          currIndex = nextIndex + rightDelim.length;
        }

        lookingForLeft = !lookingForLeft;
      }

      finalData.push({
        type: "text",
        data: text.slice(currIndex),
      });
    } else {
      finalData.push(startData[i]);
    }
  }

  return finalData;
};

const splitWithDelimiters = (text, delimiters: Delimeters) => {
  let data: SplitFragment[] = [{ type: "text", data: text }];
  for (let i = 0; i < delimiters.length; i += 1) {
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

const extractKatex = (text: string): SplitFragment[] => {
  const options = {
    delimeters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\(", right: "\\)", display: false },
    ],
  };

  const data = splitWithDelimiters(text, options.delimeters);

  if (data.length === 1 && data[0].type === "text") {
    // There is no formula in the text.
    return null;
  }

  return data;
};

export default extractKatex;
