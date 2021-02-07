import { browsePosts, getAuthorPostFilter, readPost } from "./post";

describe("Ghost post tests", () => {
  describe("post browsing", () => {
    it("should not return too many posts", async () => {
      const limit = 5;

      const posts = await browsePosts({
        limit,
      });

      expect(posts.length).toBeLessThanOrEqual(limit);
    });

    it("should not require any parameters", async () => {
      const posts = await browsePosts();

      expect(posts.length).toBeGreaterThan(0);
    });
  });

  describe("post reading", () => {
    it("should return the proper post", async () => {
      const [{ slug }] = await browsePosts();

      const post = await readPost({
        slug,
      });

      expect(post.slug).toBe(slug);
      expect(post.html).toBeDefined();
    });
  });

  describe("post filtering", () => {
    it("should return a proper filter function", async () => {
      const posts = await browsePosts();

      const author = posts[0].authors[0];

      const filtered = posts.filter(getAuthorPostFilter(author.slug));

      filtered.forEach((post) => {
        expect(post.authors.find(({ slug }) => slug === author.slug)).toEqual(author);
      });
    });
  });
});
