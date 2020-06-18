/**
 * The basic response type.
 */
export interface BasicResponse<T> {
  data: T;
}

/**
 * A response used for arrays.
 */
export interface CollectionResponse<T> extends BasicResponse<T[]> {
  data: T[];
  meta: {
    total: number;
  };
}