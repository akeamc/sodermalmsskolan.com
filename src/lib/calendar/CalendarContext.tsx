import { DateTime, DurationObjectUnits } from "luxon";
import React, {
  createContext, FunctionComponent, useCallback, useContext, useEffect, useRef, useState,
} from "react";
import CalendarEventInstance from "./event/CalendarEventInstance";
import CalendarEventSchedule from "./event/CalendarEventSchedule";
import useCalendarEventSchedules from "./hooks/useCalendarEventSchedules";

export type CalendarScope = "day" | "week" | "month";

export interface CalendarContextData {
  cursor: DateTime;
  setCursor: (cursor: DateTime) => void;
  moveMonths: (months: number) => void;
  scope: CalendarScope;
  setScope: (scope: CalendarScope) => void;
  startOfScope: DateTime;
  endOfScope: DateTime;
  schedules: CalendarEventSchedule[];
  schedulesSignature: string;
  getEventInstances: (date: DateTime) => CalendarEventInstance[];
}

const defaultCalendarContextData: CalendarContextData = {
  cursor: DateTime.now(),
  setCursor: () => {
    throw new Error("`setCursor` hasn't been implemented.");
  },
  moveMonths: () => {
    throw new Error("`moveMonths` hasn't been implemented.");
  },
  scope: "week",
  setScope: () => {
    throw new Error("`setScope` hasn't been implemented.");
  },
  startOfScope: DateTime.now(),
  endOfScope: DateTime.now(),
  schedules: [],
  schedulesSignature: "",
  getEventInstances: () => {
    throw new Error("`getEventInstances` hasn't been implemented.");
  },
};

const CalendarContext = createContext<CalendarContextData>(defaultCalendarContextData);

/**
 * Use calendar context.
 *
 * @returns {CalendarContextData} Context data.
 */
export const useCalendarContext = (): CalendarContextData => useContext(CalendarContext);

/**
 * Get a cache key for a day.
 *
 * @param {DateTime} date Date.
 *
 * @returns {string} The cache key.
 */
const getEventInstanceCacheKey = (date: DateTime): string => date.toISODate();

export interface CalendarContextProviderProps {
  initialCursor?: DateTime;
}

/**
 * Calendar context provider.
 *
 * @param {React.PropsWithChildren<CalendarContextProviderProps>} props Props.
 *
 * @returns {React.ReactElement} Provider.
 */
export const CalendarContextProvider: FunctionComponent<CalendarContextProviderProps> = ({
  initialCursor = DateTime.now(),
  ...props
}) => {
  const schedules = useCalendarEventSchedules(["o93", "o9ty", "o9ma", "o9dka"]);
  const eventInstanceRef = useRef<Map<string, CalendarEventInstance[]>>(new Map());

  const [cursor, setCursor] = useState(initialCursor);
  const [scope, setScope] = useState(defaultCalendarContextData.scope);

  /**
   * Move the cursor `months` number of months forward or backward.
   *
   * @param {number} months How many months to jump.
   */
  const moveMonths = useCallback((months: number) => {
    setCursor(cursor.plus({
      months,
    }).startOf("month"));
  }, [cursor]);

  const prevSchedulesSignatureRef = useRef<string>();
  const schedulesSignature = schedules.map((schedule) => schedule.signature).join(",");

  /**
   * Preload the `CalendarEventInstance`s for a specified date and granuality
   * (whether to preload a week, month, or year, e.g).
   *
   * @param {DateTime} around Cursor date.
   * @param {keyof DurationObjectUnits} granuality Unit.
   */
  const preloadEventInstances = useCallback((
    around: DateTime,
    granuality: keyof DurationObjectUnits,
  ): void => {
    const before = around.startOf(granuality);
    const after = around.endOf(granuality);

    const eventInstances = schedules
      .flatMap((eventSchedule) => eventSchedule.evaluate(
        before,
        after,
        true,
      ))
      // Sort the instances in order to make subsequent reads faster.
      .sort((a, b) => a.start.toMillis() - b.start.toMillis());

    const dayCount = after.diff(before, "days").days + 1;

    for (let dayIndex = 0; dayIndex <= dayCount; dayIndex += 1) { // Loop through every date.
      const date = before.plus({
        days: dayIndex,
      });

      let i = 0;

      // Find the index last element in the sorted array with the correct date.
      while (i < eventInstances.length && date.hasSame(eventInstances[i].start, "day")) {
        i += 1;
      }

      // Fetch and remove the instances from the array and insert them into the map.
      eventInstanceRef.current.set(getEventInstanceCacheKey(date), eventInstances.splice(0, i));
    }
  }, [schedules]);

  useEffect(() => {
    if (prevSchedulesSignatureRef.current !== schedulesSignature) {
      prevSchedulesSignatureRef.current = schedulesSignature;
      eventInstanceRef.current.clear();

      preloadEventInstances(cursor, "year");
    }
  }, [cursor, preloadEventInstances, schedulesSignature]);

  /**
   * Return the cached event instances. If a cache miss occurs, the cache is revalidated.
   *
   * @param {DateTime} date Date to search.
   *
   * @returns {CalendarEventInstance[]} Event instances.
   */
  const getEventInstances = useCallback((date: DateTime): CalendarEventInstance[] => {
    const cacheKey = getEventInstanceCacheKey(date);

    if (!eventInstanceRef.current.has(cacheKey)) {
      preloadEventInstances(date, "year");
    }

    return eventInstanceRef.current.get(cacheKey);
  }, [preloadEventInstances]);

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
        schedulesSignature,
        getEventInstances,
      }}
      {...props}
    />
  );
};

export default CalendarContext;
