import classNames from "classnames/bind";
import { DateTime } from "luxon";
import { transparentize } from "polished";
import React, { CSSProperties, FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import CalendarEventInstance from "../../../lib/calendar/event/CalendarEventInstance";
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
  const { scope } = useCalendarContext();

  const {
    details: {
      summary,
      color,
      duration,
      location,
    },
    start,
    end,
  } = calendarEvent;

  const startInSeconds = secondsSinceMidnight(start);
  const horizontal = duration <= 1800;
  const compact = scope !== "day";

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
        horizontal,
        compact,
      })}
      >
        <span className={cx("meta")}>
          <span>
            <time dateTime={start.toISO()}>
              {start.toLocaleString(DateTime.TIME_24_SIMPLE)}
            </time>
            –
            <time dateTime={end.toISO()}>
              {end.toLocaleString(DateTime.TIME_24_SIMPLE)}
            </time>
          </span>
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
