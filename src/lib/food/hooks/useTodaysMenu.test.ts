import { DateTime } from "luxon";
import ClientMenu from "../structures/client/Menu";
import { getNextMenuIndex } from "./useTodaysMenu";

describe("getNextMenuIndex test", () => {
  it("should work as expected", () => {
    const cursor = DateTime.utc(2020, 1, 1, 8, 10);

    const menus: ClientMenu[] = [
      new ClientMenu({
        dishes: [],
        date: DateTime.utc(2019, 12, 1).toISO(),
      }),
      new ClientMenu({
        dishes: [],
        date: DateTime.utc(2020, 1, 1, 0, 0).toISO(),
      }),
    ];

    expect(getNextMenuIndex(menus, cursor)).toBe(1);
  });

  it("should respect the time zone of the cursor", () => {
    const cursor = DateTime.utc(2020, 1, 1, 18, 0).setZone("Pacific/Auckland");

    expect(cursor.hour).toBe(7);
    expect(cursor.day).toBe(2);

    const menuDate = DateTime.utc(2020, 1, 1, 12, 0);

    expect(menuDate.hour).toBe(12);
    expect(menuDate.day).toBe(1);

    expect(menuDate.day).not.toBe(cursor.day);

    const menus: ClientMenu[] = [
      new ClientMenu({
        dishes: [],
        date: DateTime.utc(2020, 1, 1, 12, 0).toISO(),
      }),
    ];

    expect(getNextMenuIndex(menus, cursor)).toBe(0);
  });
});
