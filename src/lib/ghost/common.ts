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

/**
 * Fill `SharedParams` with the default parameters.
 *
 * @param {SharedParams} input Shared parameters.
 *
 * @returns {SharedParams} The parameters, filled-in.
 */
export const defaultSharedParams = (input: SharedParams): SharedParams => ({
  include: ["tags", "authors"],
  limit: "all",
  ...input,
});

/**
 * Pre-fill `ReadParams` with the default parameters.
 *
 * @param {ReadParams} input Read parameters.
 *
 * @returns {ReadParams} The filled-in read parameters.
 */
export const defaultReadParams = (input: ReadParams): ReadParams => ({
  ...defaultSharedParams(input),
  ...input,
});

/**
 * Add the default parameters to a `BrowseParams` object.
 *
 * @param {BrowseParams} input Input parameters.
 *
 * @returns {BrowseParams} Browse parameters with the default options.
 */
export const defaultBrowseParams = (input: BrowseParams): BrowseParams => ({
  ...defaultSharedParams(input),
  order: "published_at DESC",
  ...input,
});

export interface GhostStaticPathParams extends ParsedUrlQuery {
  slug: string;
}
