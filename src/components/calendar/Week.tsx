import React, { FunctionComponent } from "react";
import { CalendarEventInstance, getCalendarEventId } from "../../lib/calendar/event";
import CalendarDay from "./Day";
import CalendarEventView from "./Event";

export interface CalendarWeekProps {
  dayCount?: number;
  eventInstances: CalendarEventInstance[];
}

const CalendarWeek: FunctionComponent<CalendarWeekProps> = ({ dayCount = 7, eventInstances }) => (
  <>
    {Array.from({ length: dayCount })
      .map((_, weekday) => (
        // eslint-disable-next-line react/no-array-index-key
        <CalendarDay key={weekday} weekday={weekday}>
          {eventInstances
            .filter(({ start }) => (start.getDay() + 6) % 7 === weekday)
            .map((calendarEvent) => {
              const { start, ...rest } = calendarEvent;

              return (
                <CalendarEventView
                  key={getCalendarEventId(calendarEvent)}
                  start={start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds()}
                  {...rest}
                />
              );
            })}
        </CalendarDay>
      ))}
  </>
);

export default CalendarWeek;
