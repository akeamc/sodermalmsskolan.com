import React, { FunctionComponent } from "react";
import { CalendarEventInstance } from "../../lib/calendar/event";
import CalendarDay from "./Day";

export interface CalendarWeekProps {
  dayCount?: number;
  eventInstances: CalendarEventInstance[];
  placeholder?: boolean;
}

const CalendarWeek: FunctionComponent<CalendarWeekProps> = ({
  dayCount = 7,
  eventInstances,
  placeholder = false,
}) => (
  <>
    {Array.from({ length: dayCount })
      .map((_, weekday) => (
        <CalendarDay
          eventInstances={
            eventInstances
              .filter(({ start }) => (start.getDay() + 6) % 7 === weekday)
            }
          // eslint-disable-next-line react/no-array-index-key
          key={weekday}
          weekday={weekday}
          placeholder={placeholder}
        />
      ))}
  </>
);

export default CalendarWeek;
