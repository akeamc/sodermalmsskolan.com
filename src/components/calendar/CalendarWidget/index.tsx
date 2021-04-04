import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import capitalize from "../../../lib/utils/capitalize";
import SidebarHeading from "../../typography/headings/SidebarHeading";
import CalendarWidgetCell from "./CalendarWidgetCell";

/**
 * Head row for the calendar widget.
 *
 * @returns {React.ReactElement} The days of the week.
 */
const CalendarWidgetHead: FunctionComponent = () => (
  <>
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
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {capitalize(DateTime.now().startOf("week").plus({
            days: i,
          }).toLocaleString({
            weekday: "short",
          }))}
        </div>
      ))}
  </>
);

/**
 * A minified calendar, showing events as dots.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const CalendarWidget: FunctionComponent = () => {
  const { cursor, moveMonths } = useCalendarContext();
  const topLeftDate = cursor.startOf("month").startOf("week");
  const bottomRightDate = topLeftDate.plus({
    weeks: 5,
  }).endOf("week");

  return (
    <div css={{
      "--cell-border-radius": "8px",
      width: "100%",
    }}
    >
      <button onClick={() => moveMonths(-1)} type="button">Back</button>
      <SidebarHeading>
        {capitalize(cursor.toLocaleString({
          month: "long",
          year: "numeric",
        }))}
      </SidebarHeading>
      <button onClick={() => moveMonths(1)} type="button">Forward</button>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto",
          gridAutoRows: "1fr",
        }}
      >
        <CalendarWidgetHead />
        {Array
          .from({
            length: bottomRightDate.diff(topLeftDate, "days").days + 1,
          })
          .map((_, i) => {
            const date = topLeftDate.plus({
              days: i,
            });

            return (
              <CalendarWidgetCell key={date.toISO()} date={date} />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarWidget;
