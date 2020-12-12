import useSWR, { responseInterface } from "swr";
import { LimitParam } from "../../ghost/common";
import Post, { browsePosts } from "../../ghost/post";
import { digibruhTagPrefix } from "../constants";

export const browseDigibruhArticles = (limit: LimitParam = "all"): Promise<Post[]> => browsePosts({
  limit,
  filter: `tag:${digibruhTagPrefix}`,
});

export const postIsDigibruhArticle = (post: Post): boolean => !!post.tags
  .find(({ slug }) => slug === digibruhTagPrefix);

/**
 * Browse Digibruh articles.
 */
export const useDigibruhArticles = (limit: LimitParam = "all"): responseInterface<Post[], unknown> => useSWR(`/digibruh/articles?limit=${limit}`, () => browseDigibruhArticles(limit));

export const useArticleUrl = (article: Post): string => (article?.slug ? `/digibruh/${article?.slug}` : undefined);
