import dayjs, { Dayjs } from "dayjs";
import React, { FunctionComponent, useMemo, useState } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { ScheduledCalendarEvent, evaluateSchedule } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import CalendarLabels from "./Labels";
import CalendarWeek from "./Week";
import usePlaceholderEvents from "../../lib/calendar/hooks/usePlaceholderEvents";

dayjs.extend(isoWeek);

export interface CalendarProps {
  events: ScheduledCalendarEvent[];
  hideWeekend?: boolean;
  shrink?: boolean;
}

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
      "--row-height": "3.25rem",
      "--header-height": "var(--row-height)",
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
