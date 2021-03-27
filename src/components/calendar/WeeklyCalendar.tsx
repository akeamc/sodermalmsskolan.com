import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";
import DayColumn, { DayColumnHeading } from "./DayColumn";
import WeeklyCalendarSidebar from "./WeeklyCalendarSidebar";

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
 * A calendar displaying one week.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const WeeklyCalendar: FunctionComponent = () => {
  const { startOfScope } = useCalendarContext();

  const dates = Array.from({ length: 7 }).map((_, i) => startOfScope.add(i, "days"));

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
        zIndex: 1,
      }}
      >
        <DaysSection css={{
          backgroundColor: "var(--color-bg-primary)",
          borderBottom: "1px solid var(--border-color)",
          marginBottom: -1,
        }}
        >
          {dates.map((date) => (
            <DayColumnHeading date={date} key={date.toISOString()} />
          ))}
        </DaysSection>
      </div>
      <div css={{
        position: "relative",
      }}
      >
        <WeeklyCalendarSidebar />
        <DaysSection>
          {dates.map((date) => (
            <DayColumn key={date.toISOString()} date={date} />
          ))}
        </DaysSection>
      </div>
    </div>
  );
};

export default WeeklyCalendar;
