import ical from "ical";
import { DateTime } from "luxon";
import { ServerDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";

const ICAL_URL = "https://calendar.google.com/calendar/ical/7jpfv1hrcpn08daip5bdlqisvo%40group.calendar.google.com/public/basic.ics";

export default class ServerMenu extends Menu {
  dishes: ServerDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ServerDish(dish));
  }

  public static async fetchAll(): Promise<ServerMenu[]> {
    const ics = await fetch(ICAL_URL).then((res) => res.text());

    const data = ical.parseICS(ics);

    const dates = Object.values(data).reduce((accu, ev) => {
      const dish = ev.summary;

      if (ev.type === "VEVENT" && dish?.length > 0) {
        const localDate = DateTime.fromJSDate(ev.start).toISODate();

        if (typeof accu[localDate] === "undefined") {
          // eslint-disable-next-line no-param-reassign
          accu[localDate] = [];
        }

        if (accu[localDate].indexOf(dish) < 0) {
          accu[localDate].push(dish);
        }
      }

      return accu;
    }, {} as Record<string, string[]>);

    return Object
      .entries(dates)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, dishes]) => (new ServerMenu({
        date,
        dishes: dishes.map((dish) => ({
          title: dish,
          id: dish,
        })),
      })));
  }
}
