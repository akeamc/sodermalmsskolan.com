import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import CalendarEventInstance from "../../lib/calendar/event/CalendarEventInstance";
import useEventInstanceTransform from "../../lib/calendar/hooks/useEventInstanceTransform";
import { breakpoints, media } from "../../styles/breakpoints";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SectionHeading } from "../text/headings";
import CalendarEventView, { CalendarEventViewProps } from "./Event";

export interface CalendarDayProps {
  /**
   * The index of the weekday, starting from 0 with **Monday**.
   */
  weekday: number;
  placeholder?: boolean;
  eventInstances: CalendarEventInstance[];
  active?: boolean;
}

const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  weekday,
  placeholder = false,
  eventInstances,
  active = false,
}) => {
  const { language } = useLocale();

  const dayText = placeholder ? <InlineSkeleton width="4em" /> : dayjs().locale(language).day(weekday + 1).format("dddd"); // DayJS uses 0 for Sunday, we use 0 for Monday.

  const instanceProps = useEventInstanceTransform<CalendarEventViewProps[]>(
    eventInstances,
    () => {
      const sorted = eventInstances.sort((a, b) => a.start.getTime() - b.start.getTime());

      return sorted
        .reduce((elements, calendarEvent) => {
          const clone = elements;

          const { start: startDate, data } = calendarEvent;

          const start = startDate.getHours() * 3600
            + startDate.getMinutes() * 60
            + startDate.getSeconds();

          // Find all events conflicting with the current and change their widths.
          const intersections = elements
            .reduce((indexes, props, index) => {
              if (start + data.duration > props.start
              && props.start + props.data.duration > start) {
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

  return (
    <section css={{
      flex: 1,
      display: active ? "initial" : "none",

      [media(breakpoints.large)]: {
        borderRight: "1px solid #eee",
        display: "initial",

        "&:first-of-type": {
          borderLeft: "1px solid #eee",
        },
      },
    }}
    >
      <div css={{
        textTransform: "capitalize",

        [media(breakpoints.large)]: {
          height: "var(--header-height)",
          textAlign: "center",
        },
      }}
      >
        <SectionHeading css={{
          margin: "2rem 0 1rem",

          [media(breakpoints.large)]: {
            display: "none",
          },
        }}
        >
          {dayText}
        </SectionHeading>
        <span css={{
          display: "none",
          lineHeight: "var(--header-height)",
          fontWeight: 500,
          fontSize: "1rem",

          [media(breakpoints.large)]: {
            display: "inline",
          },
        }}
        >
          {dayText}
        </span>
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
        {instanceProps.map((props, index) => <CalendarEventView {...props} key={index} />)}
      </ul>
    </section>
  );
};

export default CalendarDay;
