import { DateTime } from "luxon";
import secondsSinceMidnight from "./secondsSinceMidnight";

test("seconds since midnight", () => {
  expect(secondsSinceMidnight(DateTime.fromISO("2020-04-20T16:20:00"))).toBe(16 * 3600 + 20 * 60);
  expect(secondsSinceMidnight(DateTime.fromISO("1970-01-01T00:00:01"))).toBe(1);
});
