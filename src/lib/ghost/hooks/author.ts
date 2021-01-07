import { Author } from "@tryghost/content-api";
import useSWR, { responseInterface } from "swr";
import { browseAuthors } from "../author";
import { LimitParam } from "../common";

export const useAuthorUrl = (slug: string): string => `/${encodeURIComponent("författare")}/${slug}`;

export const useAuthors = (limit: LimitParam = "all"): responseInterface<Author[], unknown> => useSWR(`/ghost/authors?limit=${limit}`, () => browseAuthors({
  limit,
}));
