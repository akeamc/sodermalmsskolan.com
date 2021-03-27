import { Dayjs } from "dayjs";
import React, { FunctionComponent } from "react";
import useTime from "../../hooks/useTime";

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
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: "-0.022em",
      }}
    >
      <h2 css={{
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        margin: 0,
        color: isNow ? "var(--color-highlight)" : "var(--color-text-primary)",
      }}
      >
        {date.format("dddd")}
      </h2>
      <h3 css={{
        fontSize: "inherit",
        fontWeight: "inherit",
        letterSpacing: "inherit",
        margin: 0,
        color: isNow ? "var(--color-highlight)" : "var(--color-text-tertiary)",
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
const DayColumn: FunctionComponent<DayColumnProps> = (props) => (
  <div
    css={{
      flex: 1,
      height: "calc(var(--hour-height) * 24)",
      borderRight: "1px solid var(--border-color)",
    }}
    {...props}
  />
);

export default DayColumn;
