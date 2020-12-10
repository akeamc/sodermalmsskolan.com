import {
  PostsOrPages,
  PostOrPage,
  LimitParam,
  FilterParam,
} from "@tryghost/content-api";
import { Params } from "next/dist/next-server/server/router";
import useSWR from "swr";
import api from "./credentials";
import Digibruh from "../digibruh/Digibruh";
import { UseSWRResource } from "../common/usable";

export const defaultParams = (): Params => ({
  include: ["tags", "authors"],
  order: "published_at DESC",
  filter: `tag:-${Digibruh.tagPrefix}`,
  limit: 6,
});

export async function getPosts(
  limit: LimitParam = 10,
  filter: FilterParam = `tag:-${Digibruh.tagPrefix}`,
): Promise<PostsOrPages> {
  return api.posts.browse({
    ...defaultParams(),
    filter,
    limit,
  });
}

export function getPostBySlug(slug: string): Promise<PostOrPage> {
  return api.posts.read({
    slug,
    // @ts-ignore
    include: ["tags", "authors"],
  });
}

export async function getPostsByTag(
  tag: string,
  limit: LimitParam = "all",
): Promise<PostsOrPages> {
  return getPosts(limit, `tag:${tag}`);
}

/**
 *
 * @param slug
 * @param limit
 */
export async function getPostsByAuthor(
  slug: string,
  limit: LimitParam = 10,
): Promise<PostOrPage[]> {
  return getPosts(limit, `tag:-${Digibruh.tagPrefix}+authors.slug:${slug}`);
}

export interface UsePostsQuery {
  limit?: LimitParam,
  filter?: FilterParam
}

export const usePosts: UseSWRResource<PostsOrPages, UsePostsQuery> = (query) => {
  const params = {
    ...defaultParams(),
    ...query,
  };

  return useSWR(`/ghost/browse?limit=${params.limit}&filter=${params.filter}`, () => (
    api.posts.browse(params)
  ));
};
