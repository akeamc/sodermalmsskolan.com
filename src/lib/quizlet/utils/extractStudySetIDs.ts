import url from "url";

export const studySetIdRegExp = /^[0-9]{9}$/;

/**
 * Filter an array of (possibly invalid) URLs, returning a new array of Quizlet Study Set IDs.
 *
 * @param {string[]} urls The array of urls to be filtered.
 * @param {string} host The host to search for.
 *
 * @returns {string[]} The IDs.
 */
const extractStudySetIDs = (urls: string[], host = "quizlet.com"): string[] => urls
  .reduce((ids, raw) => {
    const parsed = url.parse(raw);

    if (parsed.host === host) {
      const segments = parsed.path.split("/");
      const possiblyId = segments[1]; // Path begins with `/`, first element is therefore ``.

      if (studySetIdRegExp.test(possiblyId) && !ids.includes(possiblyId)) {
        ids.push(possiblyId);
      }
    }

    return ids;
  }, []);

export default extractStudySetIDs;
