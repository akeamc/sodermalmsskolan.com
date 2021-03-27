/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";
import WeeklyCalendar from "./WeeklyCalendar";

/**
 * A component returning different calendars depending on the specified `scope`.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarController: FunctionComponent = () => {
  const { scope } = useCalendarContext();

  // eslint-disable-next-line default-case
  switch (scope) {
    case "day":
      return <p>day</p>;
    case "week":
      return <WeeklyCalendar />;
    case "month":
      return <p>month</p>;
    default: return <p>bruh</p>;
  }
};

/**
 * The main calendar component component, displaying the events.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const MainCalendar: FunctionComponent = () => {
  const { cursor, scope } = useCalendarContext();

  return (
    <div css={{
      "--border-color": "var(--accents-2)",
    }}
    >
      <h1>{cursor.format("MMMM YYYY")}</h1>
      <CalendarController />
    </div>
  );
};

export default MainCalendar;
