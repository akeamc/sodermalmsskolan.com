import { Dayjs } from "dayjs";
import { useCalendarContext } from "../CalendarContext";
import CalendarEventInstance from "../event/CalendarEventInstance";

/**
 * Use the event instances for a particular date.
 *
 * @param {Dayjs} date The date.
 *
 * @returns {CalendarEventInstance[]} Event instances.
 */
const useDailyEventInstances = (date: Dayjs): CalendarEventInstance[] => {
  const {
    getEventInstances,
  } = useCalendarContext();

  return getEventInstances(date);
};

export default useDailyEventInstances;
