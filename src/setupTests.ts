import { cache } from "swr";
import "next"; // Polyfills

jest.mock("./lib/analytics/gtag");

afterEach(() => {
  cache.clear();
});
