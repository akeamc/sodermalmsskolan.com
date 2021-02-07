import { browseAuthors, getAuthor, getAuthorPath } from "./author";

describe("Ghost author tests", () => {
  describe("author browsing", () => {
    it("should limit properly", async () => {
      const limit = 2;

      const authors = await browseAuthors({
        limit,
      });

      expect(authors.length).toBeLessThanOrEqual(limit);
    });

    it("should work fine without parameters", async () => {
      const authors = await browseAuthors();

      expect(authors.length).toBeGreaterThan(0);
    });
  });

  describe("author fetching", () => {
    it("should fetch authors", async () => {
      const authors = await browseAuthors();

      const { slug } = authors[Math.floor(Math.random() * authors.length)];

      const author = await getAuthor({
        slug,
      });

      expect(author.slug).toBe(slug);
    });
  });

  describe("author paths", () => {
    it("should return the correct path", () => {
      const slug = "username";

      const url = getAuthorPath(slug);

      expect(url).toBe(`/f%C3%B6rfattare/${slug}`);
    });
  });
});
