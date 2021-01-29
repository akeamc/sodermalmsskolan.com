/**
 * Returns the path of a specified post given its `slug`.
 *
 * @param {string} slug The slug of the post, e.g. `vart-innovativa-satt-att-skicka-notiser`.
 *
 * @returns {string} The path of the post (`undefined` if `slug` is not a string).
 */
const getPostPath = (slug: string): string => (typeof slug === "string" ? `/blogg/${slug}` : undefined);

export default getPostPath;
