import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import useTime from "../../../hooks/useTime";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import useDailyEventInstances from "../../../lib/calendar/hooks/useDailyEventInstances";
import capitalize from "../../../lib/utils/capitalize";
import CalendarEventDisplay from "../CalendarEventDisplay";

export interface DayColumnheadingProps {
  date: DateTime;
}

/**
 * Heading for a DayColumn.
 *
 * @param {React.PropsWithChildren<DayColumnheadingProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
export const DayColumnHeading: FunctionComponent<DayColumnheadingProps> = ({
  date,
}) => {
  const { scope } = useCalendarContext();
  const now = useTime();

  const isNow = date.hasSame(now, "day");

  const big = scope === "day";

  return (
    <div
      css={{
        flex: 1,
        borderRight: "1px solid var(--border-color)",
        textAlign: big ? undefined : "center",
        padding: 16,

        "h2, h3": {
          fontSize: big ? 24 : 16,
          fontWeight: 600,
          letterSpacing: "-0.022em",
          margin: 0,
          color: isNow ? "var(--color-highlight)" : undefined,
        },
      }}
    >
      <h2 css={{
        color: "var(--color-text-primary)",
      }}
      >
        {capitalize(date.toLocaleString({
          weekday: "long",
        }))}
      </h2>
      <h3 css={{
        color: "var(--color-text-tertiary)",
      }}
      >
        {date.toLocaleString({
          month: "numeric",
          day: "numeric",
        })}
      </h3>
    </div>
  );
};

export interface DayColumnProps {
  date: DateTime,
}

/**
 * A column representing a single day to be used in a weekly calendar.
 *
 * @param {React.PropsWithChildren<DayColumnProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered column.
 */
const DayColumn: FunctionComponent<DayColumnProps> = ({ date }) => {
  const eventInstances = useDailyEventInstances(date);

  return (
    <div css={{
      flex: 1,
      height: "calc(var(--hour-height) * 24)",
      borderRight: "1px solid var(--border-color)",
      padding: "0 var(--cell-spacing)",
    }}
    >
      <div css={{
        position: "relative",
        zIndex: 1,
      }}
      >
        {eventInstances?.map((event) => (
          <CalendarEventDisplay calendarEvent={event} key={event.signature} />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
