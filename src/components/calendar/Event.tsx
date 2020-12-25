import { darken } from "polished";
import React, { FunctionComponent } from "react";
import { CalendarEvent, humanReadableTime } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";

export interface CalendarEventViewProps extends CalendarEvent {
  /**
   * The number of seconds since midnight.
   */
  start: number;
}

const CalendarEventView: FunctionComponent<CalendarEventViewProps> = ({
  start,
  duration,
  title,
  color,
  location,
}) => (
  <li css={{
    backgroundColor: color,
    width: "100%",
    height: "6rem",
    marginBottom: "1rem",
    borderRadius: "0.3125rem",
    borderLeft: `4px solid ${darken(0.1, color)}`,
    boxSizing: "border-box",
    listStyle: "none",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "0.5rem",
    color: "#ffffff",

    [media(breakpoints.large)]: {
      position: "absolute",
      top: `calc(((${start} / var(--row-duration)) - var(--row-pad-start)) * var(--row-height))`,
      height: `calc((${duration} / var(--row-duration)) * var(--row-height))`,
      margin: 0,
    },
  }}
  >
    <time css={{
      fontFamily: fonts.monospace,
      fontSize: "0.8125rem",
      fontWeight: 400,
      opacity: 0.7,
      lineHeight: 1,
      marginBottom: "0.5rem",
      display: "inline-block",
    }}
    >
      {humanReadableTime(start)}
      –
      {humanReadableTime(start + duration)}
      {location ? ` · ${location}` : null}
    </time>
    <div css={{
      fontSize: "1rem",
      fontWeight: 500,
    }}
    >
      {title}
    </div>
  </li>
);

export default CalendarEventView;
