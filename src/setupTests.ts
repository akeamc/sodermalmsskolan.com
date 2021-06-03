import { cache } from "swr";
import "next"; // Polyfills

afterEach(() => {
  cache.clear();
});

const actualFetch = fetch;

// All calls to `/api/...` etc. should be absolute.
global.fetch = (url, options) => actualFetch(
  new URL(url.toString(), "http://localhost").href,
  options,
);
