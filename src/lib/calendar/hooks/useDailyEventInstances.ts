import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
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
  const prevDateMillisRef = useRef<number>();
  const prevSchedulesSignatureRef = useRef<string>();

  const [eventInstances, setEventInstances] = useState<CalendarEventInstance[]>();

  const {
    getEventInstances,
    schedulesSignature,
  } = useCalendarContext();

  useEffect(() => {
    const millis = date.toMillis();
    // Do not fetch new event instances if *both* the date and the schedule is the same.
    const shouldUpdate = prevDateMillisRef.current !== millis
      && prevSchedulesSignatureRef.current !== schedulesSignature;

    if (shouldUpdate) {
      prevDateMillisRef.current = millis;

      setEventInstances(getEventInstances(date));
    }
  }, [date, getEventInstances, schedulesSignature]);

  return eventInstances;
};

export default useDailyEventInstances;
