/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent, useEffect } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import capitalize from "../../../lib/utils/capitalize";
import PageHeading from "../../typography/headings/PageHeading";
import CalendarTable from "../CalendarTable";

/**
 * A component returning different calendars depending on the specified `scope`.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarController: FunctionComponent = () => {
  const { scope } = useCalendarContext();

  switch (scope) {
    case "month":
      return <p>month</p>;
    default:
      return <CalendarTable />;
  }
};

/**
 * The main calendar component component, displaying the events.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const MainCalendar: FunctionComponent = () => {
  const { cursor, scope, setScope } = useCalendarContext();

  useEffect(() => {
    window.addEventListener("keypress", (e) => {
      if (e.code === "KeyW") {
        setScope("week");
      }

      if (e.code === "KeyD") {
        setScope("day");
      }
    });
  });

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
