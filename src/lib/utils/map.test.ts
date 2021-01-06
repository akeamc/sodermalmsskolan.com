import map from "./map";

test("number mapping", () => {
  expect(map(3.5, 0, 5, 0, 10)).toBe(7);
});
