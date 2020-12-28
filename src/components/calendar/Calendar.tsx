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
import SegmentedControl from "../form/SegmentedControl";
import { FormOption } from "../form/types";
import useLocale from "../../hooks/useLocale";
import capitalize from "../../lib/utils/capitalize";

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
  shrink = false,
}) => {
  const prevEventsKey = useRef<string>(null);

  const eventsSignature = events?.map((calendarEvent) => calendarEvent.signature).join(",");

  const [evaluatedEvents, setEvaluatedEvents] = useState<CalendarEventInstance[]>(null);

  const [cursor] = useState<Dayjs>(dayjs());

  const { language } = useLocale();

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

  const weekdayControlOptions: FormOption[] = useMemo(() => {
    const options: FormOption[] = Array.from({
      length: dayCount,
    }).map((_, index) => ({
      value: index.toString(),
      label: capitalize(dayjs().locale(language).isoWeekday(index + 1).format("dddd")),
    }));

    return options;
  }, [dayCount, language]);

  const [activeTab, setActiveTab] = useState<string>(() => {
    const weekday = (dayjs().isoWeekday() + 6) % 7;

    return Math.min(weekday, dayCount - 1).toString();
  });

  return (
    <div>
      <div css={{
        [media(breakpoints.large)]: {
          display: "none",
        },
      }}
      >
        <SegmentedControl
          options={weekdayControlOptions}
          onChange={setActiveTab}
          value={activeTab}
        />
      </div>
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
          <CalendarWeek
            placeholder={!events}
            dayCount={dayCount}
            eventInstances={eventInstances}
            activeTab={parseInt(activeTab, 10)}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
