import { PostOrPage as GhostPostOrPage } from "@tryghost/content-api";
import { defaultReadParams, defaultSharedParams, ReadParams } from "./common";
import api from "./credentials";
import Post, { BrowsePostsParams, ghostPostToPost } from "./post";

export type BrowsePagesParams = BrowsePostsParams;

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
 * @param {BrowsePagesParams} params Parameters.
 *
 * @returns {Promise<Page[]>} A promise containing the pages.
 */
export const browsePages = async (params: BrowsePagesParams = {}): Promise<Page[]> => {
  const pages = await api.pages.browse(defaultSharedParams(params));

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
