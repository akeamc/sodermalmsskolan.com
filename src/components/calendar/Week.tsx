import React, { FunctionComponent, useState } from "react";
import { CalendarEventInstance } from "../../lib/calendar/event";
import { HighlightedTagProvider } from "../../lib/calendar/HighlightedTagContext";
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
}) => {
  const [highlightedTag, setHighlightedTag] = useState<string>(null);

  return (
    <HighlightedTagProvider value={[highlightedTag, setHighlightedTag]}>
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
    </HighlightedTagProvider>
  );
};

export default CalendarWeek;
