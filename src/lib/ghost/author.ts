import { Author as GhostAuthor, Identification } from "@tryghost/content-api";
import {
  defaultBrowseParams,
  defaultReadParams, ReadParams, SharedParams,
} from "./common";
import api from "./credentials";

export type BrowseAuthorsParams = SharedParams;

export default interface Author extends Identification {
  name?: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
}

/**
 * Convert a Ghost `Author` to an `Author`.
 *
 * @param {GhostAuthor} author Input Ghost `Author`.
 *
 * @returns {Author} The converted author.
 */
export const ghostAuthorToAuthor = ({
  id,
  slug,
  name,
  profile_image,
  cover_image,
  bio,
}: GhostAuthor): Author => ({
  id,
  slug,
  name,
  profileImage: profile_image,
  coverImage: cover_image,
  bio,
});

/**
 * Browse authors.
 *
 * @param {BrowseAuthorsParams} params Parameters.
 *
 * @returns {Promise<Author[]>} The authors.
 */
export const browseAuthors = async (params: BrowseAuthorsParams = {}): Promise<Author[]> => {
  const authors = await api.authors.browse(defaultBrowseParams(params));

  return authors.map(ghostAuthorToAuthor);
};

/**
 * Get the details of an author.
 *
 * @param {ReadParams} params Regular read parameters.
 *
 * @returns {Promise<Author>} The (possibly undefined) author.
 */
export const getAuthor = async (params: ReadParams): Promise<Author> => {
  const author = await api.authors.read(defaultReadParams(params));

  return ghostAuthorToAuthor(author);
};

/**
 * Get the path of an author based on their slug.
 *
 * @param {string} slug Author slug.
 *
 * @returns {string} The path.
 */
export const getAuthorPath = (slug: string): string => `/${encodeURIComponent("författare")}/${slug}`;
