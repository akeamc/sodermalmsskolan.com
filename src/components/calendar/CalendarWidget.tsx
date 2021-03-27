import { Dayjs } from "dayjs";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";

export interface CellProps {
  date: Dayjs;
}

/**
 * CalendarWidget cell.
 *
 * @param {React.PropsWithChildren<CellProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered cell.
 */
const Cell: FunctionComponent<CellProps> = ({ date }) => {
  const { cursor, setCursor } = useCalendarContext();

  const isSelectedMonth = date.isSame(cursor, "month");
  const isCursor = date.isSame(cursor, "day");

  return (
    <button
      css={[{
        backgroundColor: "transparent",
        color: isSelectedMonth ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
        fontWeight: isSelectedMonth ? 500 : 400,
        position: "relative",
        borderRadius: 8,
        border: "none",
        display: "block",
        padding: 0,
        cursor: "pointer",
        transition: "all 0.1s",
        fontFamily: "var(--font-sans)",

        "::after": {
          content: "\"\"",
          display: "block",
          paddingBottom: "100%",
        },
      }, isCursor ? {
        backgroundColor: "var(--color-highlight)",
        color: "#fff",
      } : {
        ":hover": {
          backgroundColor: "var(--accents-2)",
        },
      }]}
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
          {date.format("D")}
        </span>
      </div>
    </button>
  );
};

/**
 * A minified calendar, showing events as dots.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const CalendarWidget: FunctionComponent = () => {
  const { cursor, moveMonths } = useCalendarContext();
  const topLeftDate = cursor.startOf("month").startOf("week");
  const bottomRightDate = cursor.endOf("month").endOf("week");

  return (
    <div css={{
      "--widget-highlight-color": "",
    }}
    >
      <button onClick={() => moveMonths(-1)} type="button">Back</button>
      <h1>{cursor.format("MMMM YYYY")}</h1>
      <button onClick={() => moveMonths(1)} type="button">Forward</button>
      <div
        css={{
          width: 300,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto",
          gridAutoRows: "1fr",
          gap: 2,
        }}
      >
        {Array
          .from({
            length: 7,
          })
          .map((_, i) => (
            <div css={{
              color: "var(--color-text-tertiary)",
              textAlign: "center",
              fontWeight: 400,
              fontSize: 14,
            }}
            >
              {
                topLeftDate
                  .add(i, "days")
                  .format("dd")
              }
            </div>
          ))}
        {Array
          .from({
            length: bottomRightDate.diff(topLeftDate, "days") + 1,
          })
          .map((_, i) => (
            <Cell date={topLeftDate.add(i, "days")} />
          ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
