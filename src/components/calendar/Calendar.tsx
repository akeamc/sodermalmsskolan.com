import dayjs, { Dayjs } from "dayjs";
import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import isoWeek from "dayjs/plugin/isoWeek";
import { breakpoints, media } from "../../styles/breakpoints";
import CalendarLabels from "./Labels";
import CalendarWeek from "./Week";
import usePlaceholderEvents from "../../lib/calendar/hooks/usePlaceholderEvents";
import ScheduledCalendarEvent from "../../lib/calendar/event/ScheduledCalendarEvent";
import CalendarEventInstance from "../../lib/calendar/event/CalendarEventInstance";

dayjs.extend(isoWeek);

export interface CalendarProps {
  events: ScheduledCalendarEvent[];
  hideWeekend?: boolean;
  shrink?: boolean;
}

/**
 * A calendar.
 *
 * @param props
 * @param props.events
 * @param props.hideWeekend
 * @param props.shrink
 */
const Calendar: FunctionComponent<CalendarProps> = ({
  events,
  hideWeekend = false,
  shrink = false,
}) => {
  const prevEventsKey = useRef<string>(null);

  const eventsSignature = events?.map((calendarEvent) => calendarEvent.signature).join(",");

  const [evaluatedEvents, setEvaluatedEvents] = useState<CalendarEventInstance[]>(null);

  const [cursor] = useState<Dayjs>(dayjs());

  const dayCount = hideWeekend ? 5 : 7;

  const viewStart = cursor.startOf("isoWeek");
  const viewEnd = cursor.endOf("isoWeek").subtract(7 - dayCount, "day");

  const placeholderEvents = usePlaceholderEvents(viewStart, viewEnd);

  useEffect(() => {
    if (prevEventsKey.current === eventsSignature) {
      return;
    }

    prevEventsKey.current = eventsSignature;

    setEvaluatedEvents(null);

    if (!events) {
      return;
    }

    const triggerEvaluation = () => {
      const after = viewStart.toDate();
      const before = viewEnd.toDate();

      const evaluated = events.flatMap((calendarEvent) => calendarEvent.evaluate(after, before));

      setEvaluatedEvents(evaluated);
    };

    triggerEvaluation();
  }, [events, eventsSignature, viewEnd, viewStart]);

  const eventInstances = evaluatedEvents || placeholderEvents;

  const [earliest, latest] = useMemo(() => eventInstances
    .reduce(([min, max], { start, data: { duration } }) => {
      const startSeconds = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
      const endSeconds = startSeconds + duration;

      return [Math.min(min, startSeconds), Math.max(max, endSeconds)];
    }, [86400, 0]), [eventInstances]);

  const rowDuration = 1800;
  const rowPadStart = shrink ? Math.floor(earliest / rowDuration) : 0;
  const rowPadEnd = shrink ? (86400 / rowDuration) - Math.ceil(latest / rowDuration) : 0;
  const rows = 86400 / rowDuration - rowPadStart - rowPadEnd;

  return (
    <div>
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
        <CalendarWeek
          placeholder={!events}
          dayCount={dayCount}
          eventInstances={eventInstances}
        />
      </div>
    </div>
  );
};

export default Calendar;
