import { Author as GhostAuthor, Identification } from "@tryghost/content-api";

export const useAuthorUrl = (slug: string): string => `/${encodeURIComponent("författare")}/${slug}`;

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
