import map from "./map";

test("number mapping", () => {
  expect(map(3.5, 0, 5, 0, 10)).toBe(7);
  expect(map(-4, 0, 3, 0, -9)).toBe(12);
  expect(map(1, 0.5, 1.5, 0, 10)).toBe(5);
});
