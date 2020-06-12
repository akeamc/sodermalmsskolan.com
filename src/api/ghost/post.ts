import api from "./credentials";
import { PostsOrPages, PostOrPage, LimitParam } from "@tryghost/content-api";

export async function getPosts(limit: LimitParam = 10): Promise<PostsOrPages> {
  return await api.posts.browse({
    limit,
    include: ["tags", "authors"],
    order: "published_at DESC",
    filter: "tag:-hash-skola",
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
  return await api.posts.browse({
    limit,
    include: ["tags", "authors"],
    order: "published_at DESC",
    filter: `tag:${tag}`,
  });
}

export async function getPostsByAuthor(
  slug: string,
  limit: LimitParam = 10
): Promise<PostOrPage[]> {
  const posts = await api.posts.browse({
    limit,
    include: ["tags", "authors"],
    order: "published_at DESC",
    filter: ["featured:true", "tag:-hash-skola", `authors.slug:${slug}`],
  });

  return posts.filter((post) =>
    post.authors.some((author) => author.slug == slug)
  );
}
