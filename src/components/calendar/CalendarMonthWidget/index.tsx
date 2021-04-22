import classNames from "classnames/bind";
import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import capitalize from "../../../lib/utils/capitalize";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import SidebarHeading from "../../typography/headings/SidebarHeading";
import CursorText from "../CursorText";
import CalendarWidgetCell from "./CalendarWidgetCell";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * Head row for the calendar widget.
 *
 * @returns {React.ReactElement} The days of the week.
 */
const CalendarWidgetHead: FunctionComponent = () => {
  const { loadingSchedules } = useCalendarContext();

  return (
    <>
      {Array
        .from({
          length: 7,
        })
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={cx("table-head")} key={i}>
            {loadingSchedules ? <InlineSkeleton width="50%" /> : capitalize(DateTime.now().startOf("week").plus({
              days: i,
            }).toLocaleString({
              weekday: "short",
            }))}
          </div>
        ))}
    </>
  );
};

/**
 * A minified calendar, showing events as dots.
 *
 * @returns {React.ReactElement} The rendered widget.
 */
const CalendarMonthWidget: FunctionComponent = () => {
  const { cursor } = useCalendarContext();
  const topLeftDate = cursor.startOf("month").startOf("week");
  const bottomRightDate = topLeftDate.plus({
    weeks: 5,
  }).endOf("week");

  return (
    <div className={cx("base")}>
      <SidebarHeading>
        <CursorText scope="month" controls="right" />
      </SidebarHeading>
      <div className={cx("table")}>
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
              <CalendarWidgetCell key={date.toISODate()} date={date} />
            );
          })}
      </div>
    </div>
  );
};

export default CalendarMonthWidget;
