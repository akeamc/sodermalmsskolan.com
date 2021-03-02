import { ParsedUrlQuery } from "querystring";

export type LimitParam = number | "all";
export type FilterParam = string;
export type FormatParam = "html" | "plaintext";
export type IncludeParam = "authors" | "tags" | "count.posts";

export type Orderable = "published_at" | "title" | "name";
export type Ordering = "ASC" | "DESC";

export type OrderParam = `${Orderable} ${Ordering}`;

/**
 * Parameters used by all API requests.
 */
export interface SharedParams {
  include?: IncludeParam | IncludeParam[];
  limit?: LimitParam;
  formats?: FormatParam | FormatParam[];
}

export interface ReadParams extends SharedParams {
  slug: string;
}

export interface BrowseParams extends SharedParams {
  filter?: FilterParam;
  order?: OrderParam;
}

export interface GhostStaticPathParams extends ParsedUrlQuery {
  slug: string;
}
