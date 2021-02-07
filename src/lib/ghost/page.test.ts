import { browsePages, readPage } from "./page";

describe("Ghost page tests", () => {
  describe("page browsing", () => {
    it("should not return too many pages", async () => {
      const limit = 3;

      const pages = await browsePages({
        limit,
      });

      expect(pages.length).toBeLessThanOrEqual(limit);
    });

    it("should not require any parameters", async () => {
      const pages = await browsePages();

      expect(pages.length).toBeGreaterThan(0);
    });
  });

  describe("page reading", () => {
    it("returns the correct page", async () => {
      const pages = await browsePages();

      const { slug } = pages[Math.floor(Math.random() * pages.length)];

      const page = await readPage({
        slug,
      });

      expect(page.slug).toBe(slug);
    });
  });
});
