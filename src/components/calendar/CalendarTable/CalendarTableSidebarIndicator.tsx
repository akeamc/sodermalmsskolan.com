import classNames from "classnames/bind";
import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import useTime from "../../../hooks/useTime";
import secondsSinceMidnight from "../../../lib/calendar/utils/secondsSinceMidnight";
import styles from "./CalendarTableSidebarIndicator.module.scss";

const cx = classNames.bind(styles);

/**
 * Small tag floating along on the sidebar, indicating the current time.
 *
 * @returns {React.ReactElement} The rendered indicator.
 */
const CalendarTableSidebarIndicator: FunctionComponent = () => {
  const now = useTime();
  const hours = secondsSinceMidnight(now) / 3600;

  return (
    <div
      className={cx("container")}
      style={{
        "--hours": hours,
      }}
    >
      <span className={cx("label")}>
        {now.toLocaleString(DateTime.TIME_24_SIMPLE)}
      </span>
      <hr className={cx("bar")} />
    </div>
  );
};

export default CalendarTableSidebarIndicator;
