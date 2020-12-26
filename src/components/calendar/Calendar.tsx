import dayjs, { Dayjs } from "dayjs";
import React, { FunctionComponent, useMemo, useState } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { ScheduledCalendarEvent, evaluateSchedule, CalendarEventInstance } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import CalendarLabels from "./Labels";
import CalendarWeek from "./Week";

dayjs.extend(isoWeek);

export interface CalendarProps {
  events: ScheduledCalendarEvent[];
  hideWeekend?: boolean;
  shrink?: boolean;
}

const usePlaceholderEvents = (
  after: Dayjs,
  before: Dayjs,
  count = 3,
): CalendarEventInstance[] => useMemo(() => {
  const days = before.diff(after, "day");

  return Array.from({
    length: days + 1,
  }).map((_, index) => Array.from({
    length: count,
  }).map(() => {
    const hours = Math.floor(Math.random() * 8) + 9;

    const start = after.add(index, "day").add(hours, "hour");

    return {
      start: start.toDate(),
      title: null,
      duration: (Math.floor(Math.random() * 10) + 10) * 5 * 60,
      placeholder: true,
    };
  })).flat();
}, [after, before, count]);

/**
 * A calendar.
 */
const Calendar: FunctionComponent<CalendarProps> = ({
  events,
  hideWeekend = false,
  shrink = true,
}) => {
  const [cursor] = useState<Dayjs>(dayjs());

  const dayCount = hideWeekend ? 5 : 7;

  const viewStart = cursor.startOf("isoWeek");
  const viewEnd = cursor.endOf("isoWeek").subtract(7 - dayCount, "day");

  const placeholderEvents = usePlaceholderEvents(viewStart, viewEnd);

  const eventInstances = useMemo(() => {
    if (!events) {
      return placeholderEvents;
    }

    return evaluateSchedule(
      events,
      viewStart.toDate(),
      viewEnd.toDate(),
    );
  }, [
    events, viewStart, viewEnd, placeholderEvents,
  ]);

  const [earliest, latest] = useMemo(() => eventInstances
    .reduce(([min, max], { start, duration }) => {
      const startSeconds = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
      const endSeconds = startSeconds + duration;

      return [Math.min(min, startSeconds), Math.max(max, endSeconds)];
    }, [86400, 0]), [eventInstances]);

  const rowDuration = 1800;
  const rowPadStart = shrink ? Math.floor(earliest / rowDuration) : 0;
  const rowPadEnd = shrink ? (86400 / rowDuration) - Math.ceil(latest / rowDuration) : 0;
  const rows = 86400 / rowDuration - rowPadStart - rowPadEnd;

  return (
    <div css={{
      position: "relative",
      "--row-duration": rowDuration,
      "--row-height": "50px",
      "--header-height": "50px",
      "--row-pad-start": rowPadStart,
      "--row-pad-end": rowPadEnd,
      "--rows": rows,
      "--labels-width": "0px",

      [media(breakpoints.extraLarge)]: {
        "--labels-width": "4rem",
      },
    }}
    >
      <CalendarLabels
        placeholder={!events}
        rowCount={rows}
        rowPadStart={rowPadStart}
        rowDuration={rowDuration}
      />
      <div css={{
        marginLeft: "var(--labels-width)",

        [media(breakpoints.large)]: {
          display: "flex",
          height: "calc(var(--rows) * var(--row-height)) + var(--header-height)",
        },
      }}
      >
        <CalendarWeek placeholder={!events} dayCount={dayCount} eventInstances={eventInstances} />
      </div>
    </div>
  );
};

export default Calendar;
