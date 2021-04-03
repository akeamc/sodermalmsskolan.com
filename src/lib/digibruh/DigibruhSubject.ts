import Post from "../ghost/post";
import Tag from "../ghost/tag";
import digibruhTagPrefix from "./digibruhTagPrefix";

export default interface DigibruhSubject {
  name: string;
  slug: string;
}

export const subjectRegex = new RegExp(`^${digibruhTagPrefix}-[a-zA-Z]+$`);

/**
 * Does what it says.
 *
 * @param {Tag} tag Ghost tag.
 *
 * @returns {DigibruhSubject} Converted tag.
 */
export const convertTagToSubject = (tag: Tag): DigibruhSubject => ({
  name: tag.name.substring(1), // All Digibruh tag names are prefixed with # to make them internal.
  slug: tag.slug.substring(digibruhTagPrefix.length + 1), // +1 because the # must be accounted for.
});

/**
 * Extract a Digibruh subject.
 *
 * @param {Post} article Article to scan.
 *
 * @returns {DigibruhSubject} The subject.
 */
export const extractSubjectFromPost = (article: Post): DigibruhSubject => {
  const tag = article?.tags?.find(({ slug }) => subjectRegex.test(slug));

  if (tag) {
    return convertTagToSubject(tag);
  }

  return undefined;
};
