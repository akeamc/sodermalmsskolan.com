import relativelyReadableColor, { defaultDarkForeground, defaultLightForeground } from "./relativelyReadableColor";

test("relatively readable color", () => {
  expect(relativelyReadableColor("#000000")).toBe(defaultLightForeground);
  expect(relativelyReadableColor("#ffffff")).toBe(defaultDarkForeground);
});
