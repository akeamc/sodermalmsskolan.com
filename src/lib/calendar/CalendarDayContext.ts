import { createContext, useContext } from "react";

export interface CalendarDayContextData {
  weekday: number;

  /**
   * The end time of the last event of the day, expressed in seconds since midnight.
   */
  dayEnd: number;
}

const CalendarDayContext = createContext<CalendarDayContextData>({
  weekday: 0,
  dayEnd: 60 * 60 * 60 * 24,
});

/**
 * Use the CalendarDay context.
 *
 * @returns {CalendarDayContextData} The context data.
 */
export const useCalendarDayContext = (): CalendarDayContextData => useContext(CalendarDayContext);

export default CalendarDayContext;
