import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import DayColumn, { DayColumnHeading } from "./DayColumn";
import CalendarTableSidebar from "./CalendarTableSidebar";

/**
 * Main section of the weekly calendar, without the sidebar.
 *
 * @param {React.PropsWithChildren} props Generic props.
 *
 * @returns {React.ReactElement} Rendered section.
 */
const DaysSection: FunctionComponent = (props) => (
  <div
    css={{
      display: "flex",
      marginLeft: "var(--sidebar-width)",
      borderLeft: "1px solid var(--border-color)",
    }}
    {...props}
  />
);

/**
 * A calendar displaying one or more days.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarTable: FunctionComponent = () => {
  const { startOfScope, endOfScope } = useCalendarContext();

  const dayCount = endOfScope.diff(startOfScope, "days").days + 1;

  const dates = Array.from({ length: dayCount }).map((_, i) => startOfScope.plus({
    days: i,
  }));

  return (
    <div css={{
      "--hour-height": "128px",
      "--sidebar-width": "64px",
      "--cell-spacing": "4px",
      position: "relative",
      borderTop: "1px solid var(--border-color)",
    }}
    >
      <div css={{
        position: "sticky",
        top: 0,
        zIndex: 2,
      }}
      >
        <DaysSection css={{
          backgroundColor: "var(--color-bg-primary)",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: -1,
        }}
        >
          {dates.map((date) => (
            <DayColumnHeading date={date} key={date.toISO()} />
          ))}
        </DaysSection>
      </div>
      <div css={{
        position: "relative",
        paddingBottom: 24,
      }}
      >
        <CalendarTableSidebar />
        <DaysSection>
          {dates.map((date) => (
            <DayColumn key={date.toISO()} date={date} />
          ))}
        </DaysSection>
      </div>
    </div>
  );
};

export default CalendarTable;
