import { FormatParam, IncludeParam, OrderParam } from "@tryghost/content-api";

export type LimitParam = number | "all";

/**
 * Parameters used by all API requests.
 */
export interface SharedParams {
  include?: IncludeParam | IncludeParam[],
  limit?: LimitParam,
  formats?: FormatParam | FormatParam[],
  order?: OrderParam
}

export interface ReadParams extends SharedParams {
  slug: string;
}

/**
 * Fill `Params` with the default parameters.
 * @param input
 */
export const defaultSharedParams = (input: SharedParams): SharedParams => ({
  include: ["tags", "authors"],
  order: "published_at DESC",
  limit: "all",
  ...input,
});

export const defaultReadParams = (input: ReadParams): ReadParams => ({
  ...defaultSharedParams(input),
  slug: input.slug,
});
