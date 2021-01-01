import useSWR, { responseInterface } from "swr";
import digibruhTagPrefix from "../../digibruh/digibruhTagPrefix";
import { LimitParam } from "../../ghost/common";
import Post, { browsePosts } from "../../ghost/post";

/**
 * Use the latest posts published on the blog.
 */
export const usePosts = (limit: LimitParam = "all"): responseInterface<Post[], unknown> => useSWR(`/blog/posts?limit=${limit}`, () => browsePosts({
  limit,
  filter: `tag:-${digibruhTagPrefix}`,
}));

export const usePostUrl = (slug: string): string => (slug ? `/blogg/${slug}` : undefined);
