import { DateTime } from "luxon";
import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import useTime from "../../../hooks/useTime";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import CalendarEventInstance from "../../../lib/calendar/event/CalendarEventInstance";

export interface CalendarWidgetCellProps {
  date: DateTime;
}

/**
 * CalendarWidget cell.
 *
 * @param {React.PropsWithChildren<CalendarWidgetCellProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered cell.
 */
const CalendarWidgetCell: FunctionComponent<CalendarWidgetCellProps> = ({ date }) => {
  const {
    cursor,
    setCursor,
    scope,
    startOfScope,
    endOfScope,
    getEventInstances,
  } = useCalendarContext();

  const now = useTime(10000);

  const prevDateMillisRef = useRef<number>();

  const [eventInstances, setEventInstances] = useState<CalendarEventInstance[]>([]);

  const isSelectedMonth = date.hasSame(cursor, "month");
  const isCursor = date.hasSame(cursor, "day");
  const isInScope = date.hasSame(cursor, scope);
  const isToday = date.hasSame(now, "day");

  const leftBorderRadius = !isInScope || startOfScope.hasSame(date, "day");
  const rightBorderRadius = !isInScope || endOfScope.hasSame(date, "day");

  useEffect(() => {
    const millis = date.toMillis();

    if (prevDateMillisRef.current !== millis) {
      prevDateMillisRef.current = millis;

      setEventInstances(getEventInstances(date));
    }
  }, [date, getEventInstances]);

  return (
    <button
      css={[{
        backgroundColor: isInScope ? "var(--accents-2)" : "transparent",
        color: isSelectedMonth ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
        fontWeight: isSelectedMonth ? 500 : 400,
        position: "relative",
        border: "none",
        display: "block",
        padding: 0,
        cursor: "pointer",
        transition: "all 0.1s",
        fontFamily: "var(--font-sans)",
        borderRadius: "var(--cell-border-radius)",
        margin: 0,

        ":hover": {
          backgroundColor: "var(--accents-2)",
        },

        "::after": {
          content: "\"\"",
          display: "block",
          paddingBottom: "100%",
        },
      }, !leftBorderRadius ? {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      } : undefined, !rightBorderRadius ? {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      } : undefined, isToday ? {
        color: "var(--color-highlight)",
      } : undefined, isCursor ? {
        color: "#fff",

        "::after": {
          backgroundColor: "var(--color-highlight)",
          borderRadius: "var(--cell-border-radius)",
        },
      } : undefined]}
      onClick={() => setCursor(date)}
      type="button"
    >
      <div css={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <span css={{
          textAlign: "center",
          display: "inline-block",
          fontSize: 16,
          lineHeight: 1,
          fontFeatureSettings: "\"ss01\"",
        }}
        >
          {date.day}
        </span>
        <div css={{
          position: "absolute",
          bottom: 6,
          display: "flex",
        }}
        >
          {eventInstances?.map(({
            details: {
              color,
            },
            signature,
          }) => (
            <span
              key={signature}
              css={{
                height: 4,
                width: 4,
                borderRadius: "50%",
                backgroundColor: isCursor ? "currentColor" : color,
                display: "block",
                margin: "0 2px",
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

export default CalendarWidgetCell;
