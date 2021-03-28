import usePeriods from "../../schedule/hooks/usePeriods";
import CalendarEventSchedule from "../event/CalendarEventSchedule";

/**
 * Get the schedules.
 *
 * @returns {CalendarEventSchedule[]} The schedules.
 */
const useCalendarEventSchedules = (): CalendarEventSchedule[] => {
  const periods = usePeriods();

  return periods.map((period) => period.eventSchedule());
};

export default useCalendarEventSchedules;
