import { cache } from "swr";

jest.mock("./lib/analytics/gtag");

afterEach(() => {
  cache.clear();
});
