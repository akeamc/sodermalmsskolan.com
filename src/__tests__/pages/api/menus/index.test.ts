import { testApiHandler } from "next-test-api-route-handler";
import handler from "../../../../pages/api/menus";

test("/api/menus", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "GET",
      });

      const menus = await res.json();

      expect(menus.length).toBeGreaterThan(0);
      expect(res.headers.get("cache-control")).toBe("s-maxage=604800, stale-while-revalidate=604800");
    },
  });
});
