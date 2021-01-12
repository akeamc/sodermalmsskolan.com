import { getHumanReadableDuration, parseHumanReadableDuration } from "./humanReadable";

test("get human readable duration", () => {
  expect(getHumanReadableDuration(15600)).toBe("4:20");
  expect(getHumanReadableDuration(15600, true)).toBe("04:20");

  expect(getHumanReadableDuration(58800)).toBe("16:20");
  expect(getHumanReadableDuration(58800, true)).toBe("16:20");
});

test("parse human readable duration", () => {
  expect(parseHumanReadableDuration("4:20")).toBe(15600);
  expect(parseHumanReadableDuration("16:20")).toBe(58800);
  expect(parseHumanReadableDuration("16.20", ".")).toBe(58800);
});
