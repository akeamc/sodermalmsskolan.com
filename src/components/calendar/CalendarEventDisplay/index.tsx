import classNames from "classnames/bind";
import { transparentize } from "polished";
import React, { CSSProperties, FunctionComponent, useMemo } from "react";
import CalendarEventInstance from "../../../lib/calendar/event/CalendarEventInstance";
import { getHumanReadableDuration } from "../../../lib/calendar/utils/humanReadable";
import secondsSinceMidnight from "../../../lib/calendar/utils/secondsSinceMidnight";
import relativelyReadableColor from "../../../styles/utils/relativelyReadableColor";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

export interface CalendarEventDisplayProps {
  calendarEvent: CalendarEventInstance;
}

export interface CSSVariables extends CSSProperties {
  "--start": number;
  "--duration": number;
  "--color": string;
  "--text-color": string;
  "--dark-color": string;
}

/**
 * A universal display for a `CalendarEvent`.
 *
 * @param {React.PropsWithChildren<CalendarEventDisplayProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered event.
 */
const CalendarEventDisplay: FunctionComponent<CalendarEventDisplayProps> = ({
  calendarEvent,
}) => {
  const {
    details: {
      summary,
      color,
      duration,
      location,
    },
    start,
  } = calendarEvent;

  const startInSeconds = useMemo(() => secondsSinceMidnight(start), [start]);
  const endInSeconds = startInSeconds + duration;
  const compact = duration <= 1800;

  const variables: CSSVariables = {
    "--start": startInSeconds,
    "--duration": duration,
    "--color": color,
    "--text-color": relativelyReadableColor(color),
    "--dark-color": transparentize(0.8, color),
  };

  return (
    <div
      className={cx("container")}
      style={variables}
    >
      <div className={cx("calendar-event", {
        compact,
      })}
      >
        <span className={cx("meta")}>
          <time>
            {getHumanReadableDuration(startInSeconds)}
            <span className={cx("end")}>
              –
              {getHumanReadableDuration(endInSeconds)}
            </span>
          </time>
          {location ? (
            <span>{location}</span>
          ) : undefined}
        </span>
        <h2>
          {summary}
        </h2>
      </div>
    </div>
  );
};

export default CalendarEventDisplay;
