import secondsSinceMidnight from "./secondsSinceMidnight";

test("seconds since midnight", () => {
  expect(secondsSinceMidnight(new Date("2020-04-20 16:20"))).toBe(16 * 3600 + 20 * 60);
  expect(secondsSinceMidnight(new Date("1970-01-01 00:00:01"))).toBe(1);
});
