import useSWR from "swr";
import { digibruhTagPrefix } from "../../digibruh/constants";
import { LimitParam } from "../../ghost/common";
import { browsePosts } from "../../ghost/post";

/**
 * Use the latest posts published on the blog.
 */
export const usePosts = (limit: LimitParam = "all") => useSWR(`/blog/posts?limit=${limit}`, () => browsePosts({
  limit,
  filter: `tag:-${digibruhTagPrefix}`,
}));

export const usePostUrl = (slug: string) => (slug ? `/blogg/${slug}` : undefined);
