import {
  PostOrPage as GhostPostOrPage,
} from "@tryghost/content-api";
import { DateTime } from "luxon";
import Identification from "./identification";
import Tag, { ghostTagToTag } from "./tag";
import Author, { ghostAuthorToAuthor } from "./author";
import {
  BrowseParams,
  ReadParams,
} from "./common";
import { browseResource, readResource } from "./api";

export default interface Post extends Identification {
  title: string;
  tags: Tag[];
  cover?: string;
  html: string;
  createdAt: DateTime;
  publishedAt?: DateTime;
  updatedAt?: DateTime;
  authors: Author[];
  excerpt?: string;
  featured: boolean;
}

/**
 * Convert an "internal" post (returned by the Ghost API) to a `Post`.
 *
 * @param {GhostPostOrPage} post The post to be converted.
 * @returns {Post} A better `GhostPostOrPage`.
 */
export const ghostPostToPost = ({
  title,
  tags,
  id,
  slug,
  feature_image,
  html,
  created_at,
  published_at,
  updated_at,
  authors,
  excerpt,
  featured,
}: GhostPostOrPage): Post => ({
  title,
  tags: tags.map(ghostTagToTag),
  id,
  slug,
  cover: feature_image,
  html,
  createdAt: DateTime.fromISO(created_at),
  publishedAt: DateTime.fromISO(published_at),
  updatedAt: DateTime.fromISO(updated_at),
  authors: authors.map(ghostAuthorToAuthor),
  excerpt,
  featured: !!featured,
});

/**
 * Browse posts.
 *
 * @param {BrowseParams} params Browsing parameters passed to the API.
 * @returns {Promise<Post[]>} The posts (wrapped in a `Promise`).
 */
export const browsePosts = async (params: BrowseParams = {}): Promise<Post[]> => {
  const { posts } = await browseResource("posts", params);

  return posts.map(ghostPostToPost);
};

/**
 * Read a single post.
 *
 * @param {ReadParams} params Parameters passed to the API.
 * @returns {Promise<Post>} The post, wrapped in a `Promise`.
 */
export const readPost = async (params: ReadParams): Promise<Post> => {
  const { posts } = await readResource("posts", params);

  return ghostPostToPost(posts[0]);
};

export type PostFilter = (post: Post) => boolean;

/**
 * Get a `PostFilter` function based on an author's slug.
 *
 * @param {string} authorSlug The author's `slug`.
 * @returns {PostFilter} Function used to filter `Array<Post>`.
 */
export const getAuthorPostFilter = (authorSlug: string): PostFilter => (
  post,
) => !!post?.authors.find(({ slug }) => slug === authorSlug);
