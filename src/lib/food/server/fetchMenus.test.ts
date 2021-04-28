import fetchMenus from "./fetchMenus";

describe("fetchMenus test", () => {
  it("should return at least one menu", async () => {
    const menus = await fetchMenus();

    expect(menus.length).toBeGreaterThan(0);
  });
});
