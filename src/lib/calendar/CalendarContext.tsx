import dayjs, { Dayjs } from "dayjs";
import React, {
  createContext, FunctionComponent, useContext, useState,
} from "react";
import CalendarEventSchedule from "./event/CalendarEventSchedule";
import useCalendarEventSchedules from "./hooks/useCalendarEventSchedules";

export type CalendarScope = "day" | "week" | "month";

export interface CalendarContextData {
  cursor: Dayjs;
  setCursor: (cursor: Dayjs) => void;
  moveMonths: (months: number) => void;
  scope: CalendarScope;
  setScope: (scope: CalendarScope) => void;
  startOfScope: Dayjs;
  endOfScope: Dayjs;
  schedules: CalendarEventSchedule[];
  schedulesSignature: string;
}

const defaultCalendarContextData: CalendarContextData = {
  cursor: dayjs().locale("sv"),
  setCursor: () => {},
  moveMonths: () => {},
  scope: "week",
  setScope: () => {},
  startOfScope: dayjs(),
  endOfScope: dayjs(),
  schedules: [],
  schedulesSignature: "",
};

const CalendarContext = createContext<CalendarContextData>(defaultCalendarContextData);

/**
 * Use calendar context.
 *
 * @returns {CalendarContextData} Context data.
 */
export const useCalendarContext = (): CalendarContextData => useContext(CalendarContext);

/**
 * Calendar context provider.
 *
 * @param {React.PropsWithChildren} props Props.
 *
 * @returns {React.ReactElement} Provider.
 */
export const CalendarContextProvider: FunctionComponent = (props) => {
  const schedules = useCalendarEventSchedules();

  const [cursor, setCursor] = useState(defaultCalendarContextData.cursor);
  const [scope, setScope] = useState(defaultCalendarContextData.scope);

  /**
   * Move the cursor `months` number of months forward or backward.
   *
   * @param {number} months How many months to jump.
   */
  const moveMonths = (months: number) => {
    setCursor(cursor.add(months, "months").startOf("month"));
  };

  return (
    <CalendarContext.Provider
      value={{
        cursor,
        setCursor,
        moveMonths,
        scope,
        setScope,
        startOfScope: cursor.startOf(scope),
        endOfScope: cursor.endOf(scope),
        schedules,
        schedulesSignature: schedules.map((schedule) => schedule.signature).join(","),
      }}
      {...props}
    />
  );
};

export default CalendarContext;
