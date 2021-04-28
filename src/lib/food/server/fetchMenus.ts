import ical from "ical";
import { DateTime } from "luxon";
import Menu, { Dishes } from "../Menu";

const ICAL_URL = "https://calendar.google.com/calendar/ical/7jpfv1hrcpn08daip5bdlqisvo%40group.calendar.google.com/public/basic.ics";

/**
 * Fetch the ICAL data.
 *
 * @returns {string} The data string.
 */
export const fetchICS = (): Promise<string> => fetch(ICAL_URL).then((res) => res.text());

/**
 * Fetch the menus from a calendar.
 *
 * @returns {Menu[]} The menus.
 */
const fetchMenus = async (): Promise<Menu[]> => {
  const ics = await fetchICS();

  const data = ical.parseICS(ics);

  const dates = Object.values(data).reduce((accu, ev) => {
    if (ev.type === "VEVENT") {
      const localDate = DateTime.fromJSDate(ev.start).toISODate();

      if (typeof accu[localDate] === "undefined") {
        // eslint-disable-next-line no-param-reassign
        accu[localDate] = [];
      }

      accu[localDate].push(ev.summary);
    }

    return accu;
  }, {} as Record<string, Dishes>);

  return Object.entries(dates).map(([date, dishes]) => ({
    date,
    dishes,
  }));
};

export default fetchMenus;
