import {
  PostOrPage as GhostPostOrPage,
  FilterParam,
} from "@tryghost/content-api";
import api from "./credentials";
import Identification from "./identification";
import Tag, { ghostTagToTag } from "./tag";
import Author, { ghostAuthorToAuthor } from "./author";
import {
  defaultReadParams, defaultSharedParams, ReadParams, SharedParams,
} from "./common";

export interface BrowsePostsParams extends SharedParams {
  filter?: FilterParam;
}

export default interface Post extends Identification {
  title: string;
  tags: Tag[];
  cover?: string;
  html: string;
  createdAt: string;
  publishedAt?: string;
  updatedAt?: string;
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
  createdAt: new Date(created_at).toISOString(),
  publishedAt: new Date(published_at).toISOString(),
  updatedAt: new Date(updated_at).toISOString(),
  authors: authors.map(ghostAuthorToAuthor),
  excerpt,
  featured: !!featured,
});

/**
 * Browse posts.
 *
 * @param {BrowsePostsParams} params Browsing parameters passed to the API.
 * @returns {Promise<Post[]>} The posts (wrapped in a `Promise`).
 */
export const browsePosts = async (params: BrowsePostsParams = {}): Promise<Post[]> => {
  const posts = await api.posts.browse(defaultSharedParams(params));

  return posts.map(ghostPostToPost);
};

/**
 * Read a single post.
 *
 * @param {ReadParams} params Parameters passed to the API.
 * @returns {Promise<Post>} The post, wrapped in a `Promise`.
 */
export const readPost = async (params: ReadParams): Promise<Post> => {
  const post = await api.posts.read(defaultReadParams(params));

  return ghostPostToPost(post);
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
