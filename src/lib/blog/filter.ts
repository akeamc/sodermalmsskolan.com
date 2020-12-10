import { PostOrPage } from "@tryghost/content-api";
import Digibruh from "../digibruh/Digibruh";

/**
 * Check if a post belongs to the blog or not based on its tags.
 * @param post
 */
export const postBelongsToBlog = (post: PostOrPage): boolean => !post.tags.find((tag) => tag.slug === Digibruh.tagPrefix);
