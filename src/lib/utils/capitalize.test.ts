import capitalize from "./capitalize";

test("capitalization", () => {
  expect(capitalize("abc")).toBe("Abc");
  expect(capitalize("aBC")).toBe("ABC");
});

test("non-ASCII capitalization", () => {
  expect(capitalize("ö")).toBe("Ö");
});

test("should not break on undefined values", () => {
  expect(capitalize(undefined)).toBeUndefined();
});
