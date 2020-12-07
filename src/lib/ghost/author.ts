import { Author } from "@tryghost/content-api";
import api from "./credentials";

export async function getAuthors(): Promise<Author[]> {
  return api.authors.browse({
    limit: "all",
    include: ["count.posts"],
  });
}

export async function getAuthorBySlug(slug: string): Promise<Author> {
  return api.authors.read({
    slug,
    // @ts-ignore
    include: ["count.posts"],
  });
}

export function getAuthorUrl(slug: string): string {
  return `/blogg/forfattare/${slug}`;
}
