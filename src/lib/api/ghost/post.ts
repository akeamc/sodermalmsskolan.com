import api from "./credentials";
import {
  PostsOrPages,
  PostOrPage,
  LimitParam,
  FilterParam,
} from "@tryghost/content-api";
import { Params } from "next/dist/next-server/server/router";
import Digibruh from "../../digibruh/Digibruh";

export const defaultParams = (): Params => {
  return {
    include: ["tags", "authors"],
    order: "published_at DESC",
    filter: "tag:-" + Digibruh.tagPrefix,
    limit: 6,
  };
};

export async function getPosts(
  limit: LimitParam = 10,
  filter: FilterParam = `tag:-${Digibruh.tagPrefix}`
): Promise<PostsOrPages> {
  return api.posts.browse({
    ...defaultParams(),
    filter,
    limit,
  });
}

export async function getLastFeatured(): Promise<PostOrPage> {
  const featured: PostsOrPages = await api.posts.browse({
    filter: "featured:true,tag:-hash-skola",
    limit: 1,
    include: ["tags", "authors"],
    order: "published_at DESC",
  });

  return featured[0];
}

export async function getPostBySlug(slug: string): Promise<PostOrPage> {
  return await api.posts.read({
    slug,
    // @ts-ignore
    include: ["tags", "authors"],
  });
}

export async function getPostsByTag(
  tag: string,
  limit: LimitParam = "all"
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
  limit: LimitParam = 10
): Promise<PostOrPage[]> {
  return getPosts(limit, `tag:-${Digibruh.tagPrefix}+authors.slug:${slug}`);
}
