import { createContext, useContext } from "react";

export interface CalendarContextData {
  earliestEventStart: number,
  latestEventEnd: number,
  showPlaceholder: boolean,
  rowCount: number,
  rowPadStart: number,
  rowPadEnd: number,
  rowDuration: number,
}

export const CalendarContext = createContext<CalendarContextData>({
  earliestEventStart: 0,
  latestEventEnd: 60 * 60 * 60 * 24,
  showPlaceholder: true,
  rowCount: 0,
  rowPadStart: 0,
  rowPadEnd: 0,
  rowDuration: 1800,
});

/**
 * Use CalendarContext data.
 *
 * @returns {CalendarContextData} Context data.
 */
export const useCalendarContext = (): CalendarContextData => useContext(CalendarContext);
