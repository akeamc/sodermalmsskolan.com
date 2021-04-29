import { DateTime } from "luxon";
import Menu from "../Menu";
import { filterMenus } from "./useMenus";

/**
 * Generate menus from an array of dates.
 *
 * @param {string[]} dates The dates.
 *
 * @returns {Menu[]} Generated menus.
 */
const generateMenus = (dates: string[]): Menu[] => dates.map((date) => ({
  date,
  dishes: [],
}));

describe("menu filter", () => {
  it("should work as expected", () => {
    const data = generateMenus(["2020-01-05", "2020-01-03", "2020-01-02", "2020-01-01", "2019-12-31"]);

    expect(filterMenus(data, {
      first: DateTime.fromISO("2020-01-02"),
    })).toEqual(data.slice(0, 3));

    expect(filterMenus(data, {
      last: DateTime.fromISO("2020-01-05"),
    })).toEqual(data);

    expect(filterMenus(data, {
      first: DateTime.fromISO("2020-01-01"),
      last: DateTime.fromISO("2020-01-04"),
    })).toEqual(data.slice(1, 4));

    expect(filterMenus()).toBeUndefined();
  });
});
