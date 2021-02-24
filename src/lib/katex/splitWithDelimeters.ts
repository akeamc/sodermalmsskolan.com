import splitAtDelimiters, { Delimeter, SplitFragment } from "./splitAtDelimeters";

/**
 * Split with the specified delimeters.
 *
 * @param {string} text Input.
 * @param {Delimeter[]} delimiters Delimeters.
 *
 * @returns {SplitFragment[]} The split fragments.
 */
const splitWithDelimiters = (text: string, delimiters: Delimeter[]): SplitFragment[] => {
  let data: SplitFragment[] = [{ type: "text", data: text }];

  for (let i = 0; i < delimiters.length; i += 1) {
    const delimiter = delimiters[i];
    data = splitAtDelimiters(
      data,
      delimiter.left,
      delimiter.right,
      delimiter.display ?? false,
    );
  }

  return data.filter((fragment) => fragment.data?.length > 0);
};

export default splitWithDelimiters;
