import { Dayjs } from "dayjs";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";
import InlineSkeleton from "../skeleton/InlineSkeleton";

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
  const {
    cursor,
    setCursor,
    scope,
    startOfScope,
    endOfScope,
    getEventInstances,
  } = useCalendarContext();

  const isSelectedMonth = date.isSame(cursor, "month");
  const isCursor = date.isSame(cursor, "day");
  const isInScope = date.isSame(cursor, scope);

  const leftBorderRadius = !isInScope || startOfScope.isSame(date, "date");
  const rightBorderRadius = !isInScope || endOfScope.isSame(date, "date");

  const eventInstances = getEventInstances(date);

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
          {typeof eventInstances !== "undefined" ? date.format("D") : <InlineSkeleton width="1em" />}
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

/**
 * A minified calendar, showing events as dots.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const CalendarWidget: FunctionComponent = () => {
  const { cursor, moveMonths } = useCalendarContext();
  const topLeftDate = cursor.startOf("month").startOf("week");
  const bottomRightDate = topLeftDate.add(5, "weeks").endOf("week");

  return (
    <div css={{
      "--cell-border-radius": "8px",
      width: 300,
    }}
    >
      <button onClick={() => moveMonths(-1)} type="button">Back</button>
      <h1>{cursor.format("MMMM YYYY")}</h1>
      <button onClick={() => moveMonths(1)} type="button">Forward</button>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto",
          gridAutoRows: "1fr",
        }}
      >
        {Array
          .from({
            length: 7,
          })
          .map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              css={{
                color: "var(--color-text-tertiary)",
                textAlign: "center",
                fontWeight: 400,
                fontSize: 14,
              }}
            >
              {topLeftDate.add(i, "days").format("dd")}
            </div>
          ))}
        {Array
          .from({
            length: bottomRightDate.diff(topLeftDate, "days") + 1,
          })
          .map((_, i) => {
            const date = topLeftDate.add(i, "days");

            return (
              <Cell key={date.unix()} date={date} />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarWidget;
