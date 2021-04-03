import collections from ".";

describe("period collection tests", () => {
  test("all regular expressions should be case-insensitive", () => {
    collections.forEach((collection) => {
      expect(collection.appliesTo.ignoreCase).toBe(true);
    });
  });
});
