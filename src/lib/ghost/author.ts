import { Author as GhostAuthor, Identification } from "@tryghost/content-api";
import {
  defaultReadParams, defaultSharedParams, ReadParams, SharedParams,
} from "./common";
import api from "./credentials";

export type BrowseAuthorsParams = SharedParams;

export default interface Author extends Identification {
  name?: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
}

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
 */
export const browseAuthors = async (params: BrowseAuthorsParams = {}): Promise<Author[]> => {
  const authors = await api.authors.browse(defaultSharedParams(params));

  return authors.map(ghostAuthorToAuthor);
};

/**
 * Get the details of an author.
 */
export const getAuthor = async (params: ReadParams): Promise<Author> => {
  const author = await api.authors.read(defaultReadParams(params));

  return ghostAuthorToAuthor(author);
};
