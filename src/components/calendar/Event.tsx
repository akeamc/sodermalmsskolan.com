import { darken } from "polished";
import React, { FunctionComponent } from "react";
import { CalendarEvent, humanReadableTime } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import Emoji from "../Emoji";
import Skeleton from "../skeleton/Skeleton";

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
  canceled = false,
  description,
  placeholder = false,
}) => (
  <li css={{
    width: "100%",
    height: "6rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    listStyle: "none",

    [media(breakpoints.large)]: {
      position: "absolute",
      top: `calc(((${start} / var(--row-duration)) - var(--row-pad-start)) * var(--row-height))`,
      height: `calc((${duration} / var(--row-duration)) * var(--row-height))`,
      margin: 0,
    },
  }}
  >
    {placeholder ? <Skeleton width="100%" height="100%" /> : (
      <div css={[{
        backgroundColor: color,
        borderRadius: "0.3125rem",
        borderLeft: `4px solid ${darken(0.1, color)}`,
        boxSizing: "border-box",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "0.5rem",
        color: "#ffffff",
        height: "100%",
      }, canceled ? {
        opacity: 0.5,
        filter: "grayscale(1)",
        cursor: "not-allowed",
      } : null]}
      >
        <div css={{
          fontFamily: fonts.monospace,
          fontSize: "0.8125rem",
          fontWeight: 400,
          opacity: 0.7,
          lineHeight: 1,
          marginBottom: "0.5rem",
          display: "inline-block",
        }}
        >
          <time>
            {humanReadableTime(start)}
            –
            {humanReadableTime(start + duration)}
          </time>
          {location ? (
            <>
              {" · "}
              <span>
                {location}
              </span>
            </>
          ) : null}
        </div>
        <div css={{
          fontSize: "1rem",
          fontWeight: 500,
        }}
        >
          <Emoji>{title}</Emoji>
        </div>
        {description ? (
          <div css={{
            marginTop: "0.25rem",
            fontSize: "0.825rem",
            fontWeight: 500,
            lineHeight: 1.25,
          }}
          >
            <Emoji>{description}</Emoji>
          </div>
        ) : null}
      </div>
    )}
  </li>
);

export default CalendarEventView;
