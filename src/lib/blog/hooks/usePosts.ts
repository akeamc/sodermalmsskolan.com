import useSWR, { responseInterface } from "swr";
import digibruhTagPrefix from "../../digibruh/digibruhTagPrefix";
import { LimitParam } from "../../ghost/common";
import Post, { browsePosts } from "../../ghost/post";

/**
 * Use the latest posts published on the blog.
 *
 * @param {LimitParam} limit How many posts to fetch.
 *
 * @returns {responseInterface<Post[], any>} The `responseInterface` containing the posts.
 */
const usePosts = (limit: LimitParam = "all"): responseInterface<Post[], unknown> => useSWR(`/blog/posts?limit=${limit}`, () => browsePosts({
  limit,
  filter: `tag:-${digibruhTagPrefix}`,
}));

export default usePosts;
