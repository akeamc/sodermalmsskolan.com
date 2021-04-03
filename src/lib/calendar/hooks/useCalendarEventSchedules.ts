import usePeriods from "../../schedule/hooks/usePeriods";
import CalendarEventSchedule from "../event/CalendarEventSchedule";

/**
 * Get the schedules.
 *
 * @param {string[]} periodGroups Groups.
 *
 * @returns {CalendarEventSchedule[]} The schedules.
 */
const useCalendarEventSchedules = (periodGroups: string[]): CalendarEventSchedule[] => {
  const periods = usePeriods(periodGroups);

  return periods;
};

export default useCalendarEventSchedules;
