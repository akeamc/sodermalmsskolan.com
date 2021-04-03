import CalendarEventSchedule from "../../calendar/event/CalendarEventSchedule";
import collections from "../collections";
import { getPeriodEventSchedules, PeriodCollection } from "../Period";

/**
 * Filter the collections by the specified keywords.
 *
 * @param {string[]} groups Keywords.
 *
 * @returns {PeriodCollection[]} The collections, filtered.
 */
const getCollections = (groups: string[]): PeriodCollection[] => (
  collections
    .filter(({ appliesTo }) => (
      groups.findIndex((group) => appliesTo.test(group)) >= 0
    ))
);

/**
 * Returns the periods.
 *
 * @param {string[]} groups Array of string describing what collections to use.
 *
 * @returns {CalendarEventSchedule[]} The periods.
 */
const usePeriods = (groups: string[]): CalendarEventSchedule[] => (
  getCollections(groups)
    .flatMap(({ periods }) => periods.flatMap(getPeriodEventSchedules))
);

export default usePeriods;
