import dayjs, { Dayjs } from "dayjs";
import React, { FunctionComponent, useMemo, useState } from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { ScheduledCalendarEvent, evaluateSchedule } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import CalendarWeek from "./Week";

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

  const eventInstances = useMemo(() => evaluateSchedule(
    events,
    viewStart.toDate(),
    viewEnd.toDate(),
  ), [
    events, viewStart, viewEnd,
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
      <div css={{
        position: "absolute",
        top: "var(--header-height)",
        left: 0,
        width: "100%",
      }}
      >
        {Array.from({
          length: rows + 1, // Include both starting and finishing time label
        }).map((_, index) => {
          const totalSeconds = (index + rowPadStart) * rowDuration;
          const totalMinutes = totalSeconds / 60;

          const hour = Math.floor(totalMinutes / 60);
          const minute = totalMinutes % 60;

          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              css={{
                height: "var(--row-height)",
                position: "relative",

                "&::after": {
                  content: "\"\"",
                  height: "1px",
                  width: "calc(100% - var(--labels-width))",
                  left: "var(--labels-width)",
                  backgroundColor: "#eee",
                  position: "absolute",
                  top: 0,
                  display: "none",

                  [media(breakpoints.large)]: {
                    display: "block",
                  },
                },
              }}
            >
              <span css={{
                position: "absolute",
                top: "-0.5em",
                lineHeight: 1,
                left: 0,
                fontFamily: fonts.monospace,
                fontSize: "0.875rem",
                opacity: 0.7,
                display: "none",

                [media(breakpoints.extraLarge)]: {
                  display: "inline-block",
                },
              }}
              >
                {hour.toString().padStart(2, "0")}
                :
                {minute.toString().padStart(2, "0")}
              </span>
            </div>
          );
        })}
      </div>
      <div css={{
        marginLeft: "var(--labels-width)",

        [media(breakpoints.large)]: {
          display: "flex",
          height: "calc(var(--rows) * var(--row-height)) + var(--header-height)",
        },
      }}
      >
        <CalendarWeek dayCount={dayCount} eventInstances={eventInstances} />
      </div>
    </div>
  );
};

export default Calendar;
