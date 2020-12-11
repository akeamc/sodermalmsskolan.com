import useSWR from "swr";
import { LimitParam } from "../../ghost/common";
import Post, { browsePosts } from "../../ghost/post";
import { digibruhTagPrefix } from "../constants";

/**
 * Browse Digibruh articles.
 */
export const useDigibruhArticles = (limit: LimitParam = "all") => useSWR(`/digibruh/articles?limit=${limit}`, () => browsePosts({
  limit,
  filter: `tag:${digibruhTagPrefix}`,
}));

export const useArticleUrl = (article: Post): string => (article?.slug ? `/digibruh/${article?.slug}` : undefined);
