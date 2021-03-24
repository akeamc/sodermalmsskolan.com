export interface CacheControl {
  maxAge?: number;
  sharedMaxAge?: number;
  staleWhileRevalidate?: number;
}

/**
 * Generate a value for `Cache-Control` based on the fields provided.
 *
 * @param {CacheControl} fields `Cache-Control` fields.
 *
 * @returns {string} The `Cache-Control` fields.
 */
export const getCacheHeader = ({
  maxAge,
  sharedMaxAge,
  staleWhileRevalidate,
}: CacheControl): string => {
  const fields = {
    "max-age": maxAge,
    "s-maxage": sharedMaxAge,
    "stale-while-revalidate": staleWhileRevalidate,
  };

  return Object
    .entries(fields)
    .reduce((arr, [key, value]) => {
      if (value != null) {
        arr.push(`${key}=${value}`);
      }

      return arr;
    }, [])
    .join(", ");
};
