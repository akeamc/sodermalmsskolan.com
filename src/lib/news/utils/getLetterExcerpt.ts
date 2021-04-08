import capitalize from "../../utils/capitalize";

export interface LetterExcerpt {
  team: string;
  excerpt: string;
}

/**
 * Function used to remove useless Word page heads, etc. in order to create a good excerpt of
 * a lettter.
 *
 * @param {string} content The content of the letter, including ugly metadata.
 *
 * @returns {string} A trimmed, clean version of the content.
 */
const getLetterExcerpt = (content = ""): LetterExcerpt => {
  const regex = /Veckobrev\s(?<team>[a-z]+)\sv\.?\s?[0-9]+/i;

  const matchIndex = Math.max(content.search(regex), 0);
  const matchArray = content.match(regex);
  const matchLength = matchArray?.[0]?.length ?? 0;
  const team = capitalize(matchArray?.groups?.team);
  const excerpt = content.slice(matchIndex + matchLength).trim();

  return {
    team,
    excerpt,
  };
};

export default getLetterExcerpt;
