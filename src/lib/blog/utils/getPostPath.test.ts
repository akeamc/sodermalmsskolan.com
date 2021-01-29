import getPostPath from "./getPostPath";

test("get post path", () => {
  expect(getPostPath("bjorkeby")).toBe("/blogg/bjorkeby");
  expect(getPostPath(null)).toBe(undefined);
});
