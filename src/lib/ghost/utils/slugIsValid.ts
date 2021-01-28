import { slugify } from "@tryghost/string";

/**
 * Check if a slug is valid.
 *
 * @param {string} slug The slug to be validated.
 *
 * @returns {boolean} Whether the slug is valid.
 */
const slugIsValid = (slug: string): boolean => (slug === slugify(slug));

export default slugIsValid;
