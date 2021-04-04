import classNames from "classnames/bind";
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
import styles from "./CalendarWidgetCell.module.scss";

const cx = classNames.bind(styles);

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
          {date.day}
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
                ["--event-dot-color" as string]: isCursor ? "currentColor" : color,
              }}
            />
          ))}
        </div>
      </div>
    </button>
  );
};

export default CalendarWidgetCell;
