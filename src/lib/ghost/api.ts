import { Author, PostOrPage, Tag } from "@tryghost/content-api";
import {
  BrowseParams, LimitParam, ReadParams, SharedParams,
} from "./common";

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

export interface ResponseMeta {
  pagination: {
    page: number;
    limit: LimitParam;
    pages: number;
    total: number;
    next: number | null;
    prev: number | null;
  }
}

export interface Response {
  posts: {
    posts: PostOrPage[];
    meta?: ResponseMeta;
  };
  pages: {
    pages: PostOrPage[];
    meta?: ResponseMeta;
  };
  authors: {
    authors: Author[];
    meta?: ResponseMeta;
  }
  tags: {
    tags: Tag[];
    meta?: ResponseMeta;
  }
}

export type ResourceType = keyof Response;

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
 * @param {ResourceType} resource The resource.
 * @param {RequestParams} params Request parameters.
 * @param {string} path Optional path.
 *
 * @returns {Promise<any>} The fetched resource.
 */
const makeRequest = async <T extends ResourceType>(resource: T, params: RequestParams = {}, path = ""): Promise<Response[T]> => {
  const serializedParams = serializeParams({
    include: ["tags", "authors"],
    limit: "all",
    ...params,
  });

  const url = new URL(`${GHOST_API_CREDENTIAL.url}/ghost/api/v3/content/${resource}${path}`);

  url.search = new URLSearchParams({
    key: GHOST_API_CREDENTIAL.key,
    ...serializedParams,
  }).toString();

  // For some reason, ky wouldn't work with a ?limit value of more than 7. Instead of debugging
  // this issue like any sensible developer would do, I switched to fetch and it seems like it's 
  // working.
  const res = await fetch(url.toString());

  return res.json();
};

/**
 * Browse resources.
 *
 * @param {ResourceType} resource What resource?
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<any>} Resources.
 */
export const browseResource = <T extends ResourceType>(
  resource: T,
  params: BrowseParams = {},
): Promise<Response[T]> => makeRequest<T>(resource, {
    order: "published_at DESC",
    ...params,
  });

/**
 * Read a resource.
 *
 * @param {ResourceType} resource What resource?
 * @param {BrowseParams} params Parameters.
 *
 * @returns {Promise<any>} Resource.
 */
export const readResource = <T extends ResourceType>(
  resource: T,
  { slug, ...params }: ReadParams,
): Promise<Response[T]> => makeRequest<T>(resource, params, `/slug/${slug}`);
