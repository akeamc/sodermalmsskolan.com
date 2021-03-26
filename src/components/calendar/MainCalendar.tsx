import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";

/**
 * The main calendar component component, displaying the events.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const MainCalendar: FunctionComponent = () => {
  const { cursor } = useCalendarContext();

  return (
    <div>
      <h1>{cursor.format("MMMM YYYY")}</h1>
    </div>
  );
};

export default MainCalendar;
