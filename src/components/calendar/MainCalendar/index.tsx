/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import capitalize from "../../../lib/utils/capitalize";
import PageHeading from "../../typography/headings/PageHeading";
import WeeklyCalendar from "../WeeklyCalendar";

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
  const { cursor } = useCalendarContext();

  return (
    <div css={{
      "--border-color": "var(--accents-2)",
      width: "100%",
    }}
    >
      <PageHeading>
        {capitalize(cursor.toLocaleString({
          year: "numeric",
          month: "long",
        }))}
      </PageHeading>
      <CalendarController />
    </div>
  );
};

export default MainCalendar;
