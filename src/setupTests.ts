/* eslint-disable import/no-extraneous-dependencies */
import { cache } from "swr";
import "@testing-library/jest-dom/extend-expect";

afterEach(() => {
  cache.clear();
});
