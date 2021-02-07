import { FormatParam, IncludeParam, OrderParam } from "@tryghost/content-api";
import { ParsedUrlQuery } from "querystring";

export type LimitParam = number | "all";

/**
 * Parameters used by all API requests.
 */
export interface SharedParams {
  include?: IncludeParam | IncludeParam[];
  limit?: LimitParam;
  formats?: FormatParam | FormatParam[];
  order?: OrderParam;
}

export interface ReadParams extends SharedParams {
  slug: string;
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
  order: "published_at DESC",
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
  slug: input.slug,
});

export interface GhostStaticPathParams extends ParsedUrlQuery {
  slug: string;
}
