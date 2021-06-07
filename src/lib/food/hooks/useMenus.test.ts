import { DateTime } from "luxon";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import Menu from "../Menu";
import useMenus, { filterMenus } from "./useMenus";
import handlers from "../../../mocks/handlers";

const server = setupServer(...handlers);

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

describe("useMenus", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("should return the menus in the right order", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useMenus());

    await waitForNextUpdate();

    const menus = result.current;

    expect(menus.length).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < menus.length - 1; i += 1) {
      const a = DateTime.fromISO(menus[i].date);
      const b = DateTime.fromISO(menus[i + 1].date);

      expect(+a).toBeLessThanOrEqual(+b);
    }
  });
});
