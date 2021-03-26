import dayjs, { Dayjs } from "dayjs";
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
        color: isSelectedMonth ? undefined : "rgba(0, 0, 0, 0.25)",
        position: "relative",
        borderRadius: "50%",
        border: "none",
        display: "block",
        padding: 0,
        cursor: "pointer",
        transition: "background-color 0.1s",

        ":hover": {
          backgroundColor: "rgba(255, 0, 0, 0.1)",
        },

        "::after": {
          content: "\"\"",
          display: "block",
          paddingBottom: "100%",
        },
      }, isCursor ? {
        backgroundColor: "red !important",
        color: "white",
      } : undefined]}
      onClick={() => setCursor(date)}
      type="button"
    >
      <div css={{
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
      >
        <span css={{
          textAlign: "center",
          display: "inline-block",
          fontFamily: "monospace",
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
    <div>
      <button onClick={() => moveMonths(-1)} type="button">Back</button>
      <h1>{cursor.format("MMMM YYYY")}</h1>
      <button onClick={() => moveMonths(1)} type="button">Forward</button>
      <table
        css={{
          width: 300,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridAutoRows: "1fr",
        }}
      >
        {Array
          .from({
            length: 7,
          })
          .map((_, i) => (
            <div>
              {
                dayjs()
                  .locale(cursor.locale())
                  .startOf("week")
                  .add(i, "days")
                  .format("ddd")
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
      </table>
    </div>
  );
};

export default CalendarWidget;
