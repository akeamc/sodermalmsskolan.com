import classNames from "classnames/bind";
import React, {
  CSSProperties, FunctionComponent, useEffect, useRef,
} from "react";
import useTime from "../../../hooks/useTime";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import { getHumanReadableDuration } from "../../../lib/calendar/utils/humanReadable";
import secondsSinceMidnight from "../../../lib/calendar/utils/secondsSinceMidnight";
import styles from "./CalendarTableSidebarIndicator.module.scss";

const cx = classNames.bind(styles);

export interface CSSVariables extends CSSProperties {
  "--hours": number;
}

/**
 * Small tag floating along on the sidebar, indicating the current time.
 *
 * **Do not render this component on the server!**
 *
 * @returns {React.ReactElement} The rendered indicator.
 */
const CalendarTableSidebarIndicator: FunctionComponent = () => {
  const now = useTime();
  const { cursor } = useCalendarContext();
  const elementRef = useRef<HTMLDivElement>();

  const seconds = secondsSinceMidnight(now);
  const cursorIsToday = cursor.hasSame(now, "day");

  useEffect(() => {
    if (cursorIsToday && typeof elementRef.current.scrollIntoView === "function") {
      elementRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [cursorIsToday]);

  return (
    <div
      className={cx("container")}
      style={{
        // Any sensible person would prevent SSR errors with useEffect. Another solution is to
        // dynamically import this whole component. I have chosen the latter.
        "--hours": seconds / 3600,
      } as CSSVariables}
      ref={elementRef}
    >
      <time className={cx("label")}>
        {getHumanReadableDuration(seconds, true)}
      </time>
      <hr className={cx("bar")} />
    </div>
  );
};

export default CalendarTableSidebarIndicator;
