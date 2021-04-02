import { DateTime } from "luxon";
import { useCalendarContext } from "../CalendarContext";
import CalendarEventInstance from "../event/CalendarEventInstance";

/**
 * Use the event instances for a particular date.
 *
 * @param {DateTime} date The date.
 *
 * @returns {CalendarEventInstance[]} Event instances.
 */
const useDailyEventInstances = (date: DateTime): CalendarEventInstance[] => {
  const {
    getEventInstances,
  } = useCalendarContext();

  return getEventInstances(date);
};

export default useDailyEventInstances;
