import ky from "ky-universal";
import { BrowseParams, ReadParams, SharedParams } from "./common";

export interface GhostAPICredential {
  url: string;
  key: string;
}

export const GHOST_API_CREDENTIAL: GhostAPICredential = {
  url: "https://blogg.xn--sdermalmsskolan-8sb.com",
  key: "928358fd805a660d5ffbc84e3d",
};

export type Serialized<T> = {
  [key in keyof T]: string;
};

export type GhostResource = "posts" | "pages" | "tags" | "authors";

export type GhostAPIResponse = Record<GhostResource, unknown>;

export type RequestParams = Partial<SharedParams & BrowseParams & ReadParams>;

/**
 * Serialize parameters.
 *
 * @param {RequestParams} params Parameters to be serialized.
 *
 * @returns {Serialized<RequestParams>} Serialized parameters.
 */
export const serializeParams = (params: RequestParams): Serialized<RequestParams> => {
  const entries = Object
    .entries(params)
    .map(([key, value]) => [key, [].concat(value).join(",")]);

  return Object.fromEntries(entries);
};

/**
 * Make a request to the Ghost Content API.
 *
 * @param {GhostResource} resource The resource.
 * @param {RequestParams} params Request parameters.
 * @param {string} path Optional path.
 *
 * @returns {Promise<any>} The fetched resource.
 */
const makeRequest = async <T>(resource: GhostResource, params: RequestParams = {}, path = ""): Promise<T> => {
  const serializedParams = serializeParams({
    include: ["tags", "authors"],
    limit: "all",
    ...params,
  });

  return ky.get(`${GHOST_API_CREDENTIAL.url}/ghost/api/v3/content/${resource}${path}`, {
    searchParams: {
      key: GHOST_API_CREDENTIAL.key,
      ...serializedParams,
    },
  }).json<T>();
};

/**
 * Browse resources.
 *
 * @param {GhostResource} resource What resource?
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<any>} Resources.
 */
export const browseResource = <T>(
  resource: GhostResource,
  params: BrowseParams = {},
): Promise<T> => makeRequest<T>(resource, {
    order: "published_at DESC",
    ...params,
  });

/**
 * Read a resource.
 *
 * @param {GhostResource} resource What resource?
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<any>} Resource.
 */
export const readResource = <T>(
  resource: GhostResource,
  { slug, ...params }: ReadParams,
): Promise<T> => makeRequest<T>(resource, params, `/slug/${slug}`);
