import { Dayjs } from "dayjs";
import React, { FunctionComponent } from "react";
import useTime from "../../hooks/useTime";
import useDailyEventInstances from "../../lib/calendar/hooks/useDailyEventInstances";
import capitalize from "../../lib/utils/capitalize";
import CalendarEventDisplay from "./CalendarEventDisplay";

export interface DayColumnheadingProps {
  date: Dayjs;
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
  const now = useTime();

  const isNow = date.isSame(now, "date");

  return (
    <div
      css={{
        flex: 1,
        borderRight: "1px solid var(--border-color)",
        textAlign: "center",
        padding: "16px 0",

        "h2, h3": {
          fontSize: 16,
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
        {capitalize(date.format("dddd"))}
      </h2>
      <h3 css={{
        color: "var(--color-text-tertiary)",
      }}
      >
        {date.format("D/M")}
      </h3>
    </div>
  );
};

export interface DayColumnProps {
  date: Dayjs,
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
