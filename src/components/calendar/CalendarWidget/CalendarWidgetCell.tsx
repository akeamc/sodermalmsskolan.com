import classNames from "classnames/bind";
import { DateTime } from "luxon";
import React, {
  CSSProperties,
  FunctionComponent,
} from "react";
import useTime from "../../../hooks/useTime";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import useDailyEventInstances from "../../../lib/calendar/hooks/useDailyEventInstances";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import styles from "./CalendarWidgetCell.module.scss";

const cx = classNames.bind(styles);

export interface CalendarWidgetCellProps {
  date: DateTime;
}

export interface CSSVariables extends CSSProperties {
  "--event-dot-color": string;
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
  } = useCalendarContext();

  const now = useTime(10000);

  const eventInstances = useDailyEventInstances(date);

  const isSelectedMonth = date.hasSame(cursor, "month");
  const isCursor = date.hasSame(cursor, "day");
  const isInScope = date.hasSame(cursor, scope);
  const isToday = date.hasSame(now, "day");

  const leftBorderRadius = !isInScope || startOfScope.hasSame(date, "day");
  const rightBorderRadius = !isInScope || endOfScope.hasSame(date, "day");

  const placeholder = !eventInstances;

  return (
    <button
      className={cx("base", {
        "in-scope": isInScope,
        "selected-month": isSelectedMonth,
        today: isToday,
        cursor: isCursor,
        "sharp-left-corners": !leftBorderRadius,
        "sharp-right-corners": !rightBorderRadius,
      })}
      onClick={() => setCursor(date)}
      type="button"
    >
      <div className={cx("text-container")}>
        <span className={cx("cell-label")}>
          {placeholder ? <InlineSkeleton width="1em" /> : date.day}
        </span>
        <div className={cx("event-dot-container")}>
          {eventInstances?.map(({
            details: {
              color,
            },
            signature,
          }) => (
            <span
              key={signature}
              style={{
                "--event-dot-color": isCursor ? "currentColor" : color,
              } as CSSVariables}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

export default CalendarWidgetCell;
