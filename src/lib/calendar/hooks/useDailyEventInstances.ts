import { Dayjs } from "dayjs";
import CalendarEventInstance from "../event/CalendarEventInstance";
import useEventInstances from "./useEventInstances";

/**
 * Use the event instances for a particular date.
 *
 * @param {Dayjs} date The date.
 *
 * @returns {CalendarEventInstance[]} Event instances.
 */
const useDailyEventInstances = (date: Dayjs): CalendarEventInstance[] => (
  useEventInstances(date.startOf("day"), date.endOf("day"), true)
);

export default useDailyEventInstances;
