import { parse } from "node-html-parser";

/**
 * Convert an HTML string to an array of `<a>` `href` values.
 *
 * @param {string} html Input HTML.
 *
 * @returns {string[]} An array of hrefs.
 */
const extractHrefs = (html: string): string[] => {
  const root = parse(html);

  return root.querySelectorAll("a").reduce((hrefs, element) => {
    const href = element.getAttribute("href");

    if (typeof href === "string") {
      hrefs.push(href);
    }

    return hrefs;
  }, []);
};

export default extractHrefs;
