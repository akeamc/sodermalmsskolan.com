import { PostOrPage as GhostPostOrPage } from "@tryghost/content-api";
import {
  BrowseParams,
  defaultBrowseParams,
  defaultReadParams,
  ReadParams,
} from "./common";
import api from "./credentials";
import Post, { ghostPostToPost } from "./post";

type Page = Post;

export default Page;

/**
 * Convert a Ghost `PostOrPage` to a `Page`.
 *
 * @param {GhostPostOrPage} post The post.
 *
 * @returns {Page} Page.
 */
export const ghostPageToPage = (post: GhostPostOrPage): Page => ghostPostToPost(post);

/**
 * Browse pages.
 *
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<Page[]>} A promise containing the pages.
 */
export const browsePages = async (params: BrowseParams = {}): Promise<Page[]> => {
  const pages = await api.pages.browse(defaultBrowseParams(params));

  return pages.map(ghostPageToPage);
};

/**
 * Read a Ghost `Page`.
 *
 * @param {ReadParams} params Read parameters.
 *
 * @returns {Promise<Page>} The page.
 */
export const readPage = async (params: ReadParams): Promise<Page> => {
  const page = await api.pages.read(defaultReadParams(params));

  return ghostPageToPage(page);
};
