/**
 * Function used to remove useless Word page heads, etc. in order to create a good excerpt of
 * a lettter.
 *
 * @param {string} content The content of the letter, including ugly metadata.
 *
 * @returns {string} A trimmed, clean version of the content.
 */
const getLetterExcerpt = (content = ""): string => {
  const regex = /Veckobrev [a-z]+ v.( ?)[0-9]+/gi;

  const matchIndex = Math.max(content.search(regex), 0);
  const matchLength = content.match(regex)?.[0]?.length || 0;

  return content.slice(matchIndex + matchLength).trim();
};

export default getLetterExcerpt;
