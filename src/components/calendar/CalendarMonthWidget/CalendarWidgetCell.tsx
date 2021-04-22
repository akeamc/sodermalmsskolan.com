import classNames from "classnames/bind";
import { DateTime } from "luxon";
import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useState,
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

interface CellState {
  isSelectedMonth: boolean;
  isInScope: boolean;
  isCursor: boolean;
  isToday: boolean;
  leftBorderRadius: boolean;
  rightBorderRadius: boolean;
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
  const [{
    isCursor,
    isInScope,
    isSelectedMonth,
    isToday,
    leftBorderRadius,
    rightBorderRadius,
  }, setCellState] = useState<CellState>({
    isCursor: false,
    isInScope: false,
    isSelectedMonth: false,
    isToday: false,
    leftBorderRadius: false,
    rightBorderRadius: false,
  });

  const placeholder = !eventInstances;

  useEffect(() => {
    const newIsCursor = date.hasSame(cursor, "day");
    const newIsInScope = date.hasSame(cursor, scope);

    setCellState({
      isSelectedMonth: date.hasSame(cursor, "month"),
      isCursor: newIsCursor,
      isInScope: newIsInScope,
      isToday: date.hasSame(now, "day"),
      leftBorderRadius: !newIsInScope || startOfScope.hasSame(date, "day"),
      rightBorderRadius: !newIsInScope || endOfScope.hasSame(date, "day"),
    });
  }, [date, cursor, scope, now, startOfScope, endOfScope]);

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
