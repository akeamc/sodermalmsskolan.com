import { Dayjs } from "dayjs";
import useSWR from "swr";
import { useCalendarContext } from "../CalendarContext";
import CalendarEventInstance from "../event/CalendarEventInstance";

/**
 * React hook that evaluates `CalendarEventSchedule`s for the specified date.
 *
 * @param {Dayjs} after Lower time limit.
 * @param {Dayjs} before Upper time limit.
 * @param {boolean} inclusive Whether to make the limits inclusive or exclusive.
 *
 * @returns {CalendarEventInstance[]} The evaluated `CalendarEventInstance`s.
 */
const useEventInstances = (
  after: Dayjs,
  before: Dayjs,
  inclusive = true,
): CalendarEventInstance[] => {
  const {
    schedules,
    schedulesSignature,
  } = useCalendarContext();

  const unixAfter = after.unix();
  const unixBefore = before.unix();

  const { data } = useSWR(`/calendar/eventInstances?before=${unixBefore}&after=${unixAfter}&scheduleSignature=${schedulesSignature}`, async () => {
    const evaluated = schedules
      .flatMap((calendarEvent) => calendarEvent.evaluate(
        after.toDate(),
        before.toDate(),
        inclusive,
      ));

    return evaluated;
  }, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    compare: () => false, // If the values provided are different, the result will be too.
  });

  return data;
};

export default useEventInstances;
