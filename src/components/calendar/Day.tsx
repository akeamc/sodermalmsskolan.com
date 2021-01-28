import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import useTime from "../../hooks/useTime";
import CalendarEventInstance from "../../lib/calendar/event/CalendarEventInstance";
import useEventInstanceTransform from "../../lib/calendar/hooks/useEventInstanceTransform";
import secondsSinceMidnight from "../../lib/calendar/utils/secondsSinceMidnight";
import { breakpoints, media } from "../../styles/breakpoints";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import CalendarEventView, { CalendarEventViewProps } from "./Event";

export interface CalendarDayProps {
  /**
   * The index of the weekday, starting from 0 with **Monday**.
   */
  weekday: number;

  /**
   * Whether the calendar day is a placeholder and should display fake events.
   */
  placeholder?: boolean;

  eventInstances: CalendarEventInstance[];

  /**
   * For mobile devices. Whether the day, which is displayed as a tab, is the one being shown.
   */
  active?: boolean;
}

export interface CalendarTextProps {
  weekday?: number;
  placeholder?: boolean;
  dayEnd?: number;
}

/**
 * Component displaying the name of a day in the calendar.
 *
 * @param {React.PropsWithChildren<CalendarTextProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered text.
 */
export const CalendarDayText: FunctionComponent<CalendarTextProps> = ({
  weekday,
  placeholder = false,
  dayEnd = 60 * 60 * 24,
}) => {
  const { language } = useLocale();

  const dateNow = useTime();
  const now = dayjs(dateNow);

  const isoWeekday = weekday + 1;

  const weekdayDiff = isoWeekday - now.isoWeekday();

  let isPast = false;

  if (weekdayDiff < 0) {
    isPast = true;
  }

  if (weekdayDiff === 0) {
    isPast = secondsSinceMidnight(dateNow) > dayEnd;
  }

  return (
    <span css={[{
      display: "inline-block",
      textTransform: "capitalize",
      fontWeight: 500,
      fontSize: "1rem",
      textAlign: "center",
    }, isPast ? {
      textDecoration: "line-through",
    } : null]}
    >
      {placeholder ? <InlineSkeleton width="4em" /> : dayjs().locale(language).isoWeekday(isoWeekday).format("dddd")}
    </span>
  );
};

/**
 * Component for rendering the `CalendarEventInstance`s of a day.
 *
 * @param {React.PropsWithChildren<CalendarDayProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered calendar events.
 */
const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  weekday,
  placeholder = false,
  eventInstances,
  active = false,
}) => {
  const instanceProps = useEventInstanceTransform<CalendarEventViewProps[]>(
    eventInstances,
    () => {
      const sorted = eventInstances.sort((a, b) => a.start.getTime() - b.start.getTime());

      return sorted
        .reduce((elements, calendarEvent) => {
          const clone = elements;

          const { start: startDate, data } = calendarEvent;

          const start = secondsSinceMidnight(startDate);

          const actualStart = start + data.deltaStart;
          const actualDuration = data.duration + data.deltaDuration;

          // Find all events conflicting with the current and change their widths.
          const intersections = elements
            .reduce((indexes, other, index) => {
              const actualOtherStart = other.start + other.data.deltaStart;
              const actualOtherDuration = other.data.duration + other.data.deltaDuration;

              if (actualStart + actualDuration > actualOtherStart
              && actualOtherStart + actualOtherDuration > actualStart) {
                indexes.push(index);
              }

              return indexes;
            }, [] as number[]);

          clone.push({
            start,
            data,
          });

          // Save computing power by not changing things that don't need to.
          if (intersections.length > 0) {
            // The recently pushed item must also be cropped.
            intersections.push(clone.length - 1);

            // Divide equally.
            const elementWidth = 1 / intersections.length;

            intersections.forEach((intersectionIndex, index) => {
              const intersection = clone[intersectionIndex];

              intersection.width = elementWidth;
              intersection.left = index * elementWidth;
            });
          }

          return clone;
        }, [] as CalendarEventViewProps[]);
    },
    [],
  );

  const dayEnd = instanceProps
    .reduce((max, { start, data: { duration, deltaDuration, canceled } }) => {
      const endTime = canceled ? 0 : start + duration + deltaDuration;

      return Math.max(max, endTime);
    }, 0);

  return (
    <section css={{
      flex: 1,
      display: active ? "initial" : "none",

      [media(breakpoints.large)]: {
        borderRight: "1px solid var(--color-border-primary)",
        display: "initial",

        "&:first-of-type": {
          borderLeft: "1px solid var(--color-border-primary)",
        },
      },
    }}
    >
      <div css={{
        height: "var(--header-height)",
        width: "100%",
        position: "sticky",
        top: "var(--navbar-height)",
        backgroundColor: "var(--color-bg-primary)",
        zIndex: 2,
        boxShadow: "0 1px 0 0 var(--color-border-primary)",
        display: "none",
        alignItems: "center",
        justifyContent: "center",

        [media(breakpoints.large)]: {
          display: "flex",
        },
      }}
      >
        <CalendarDayText weekday={weekday} placeholder={placeholder} dayEnd={dayEnd} />
      </div>
      <ul css={{
        position: "relative",
        padding: 0,
        margin: 0,

        [media(breakpoints.large)]: {
          height: "calc(var(--rows) * var(--row-height))",
        },
      }}
      >
        {instanceProps
          .map((props) => <CalendarEventView {...props} key={props.data.signature} />)}
      </ul>
    </section>
  );
};

export default CalendarDay;
