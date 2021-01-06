import digibruhTagPrefix from "../digibruh/digibruhTagPrefix";
import Post from "../ghost/post";

/**
 * Check if a post belongs to the blog or not based on its tags.
 *
 * @param post
 */
const postBelongsToBlog = (post: Post): boolean => !post.tags
  .find((tag) => tag.slug === digibruhTagPrefix);

export default postBelongsToBlog;
