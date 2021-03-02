import { PostOrPage as GhostPostOrPage } from "@tryghost/content-api";
import {
  BrowseParams,
  ReadParams,
} from "./common";
import { browseResource, GhostAPIResponse, readResource } from "./api";
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

export interface GhostPagesResponse extends GhostAPIResponse {
  pages: GhostPostOrPage[];
}

/**
 * Browse pages.
 *
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<Page[]>} A promise containing the pages.
 */
export const browsePages = async (params: BrowseParams = {}): Promise<Page[]> => {
  const res = await browseResource<GhostPagesResponse>("pages", params);

  return res.pages.map(ghostPageToPage);
};

/**
 * Read a Ghost `Page`.
 *
 * @param {ReadParams} params Read parameters.
 *
 * @returns {Promise<Page>} The page.
 */
export const readPage = async (params: ReadParams): Promise<Page> => {
  const res = await readResource<GhostPagesResponse>("pages", params);

  return ghostPageToPage(res.pages[0]);
};
