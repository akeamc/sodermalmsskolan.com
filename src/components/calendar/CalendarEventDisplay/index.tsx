import { transparentize } from "polished";
import React, { FunctionComponent } from "react";
import CalendarEventInstance from "../../../lib/calendar/event/CalendarEventInstance";
import { getHumanReadableDuration } from "../../../lib/calendar/utils/humanReadable";
import secondsSinceMidnight from "../../../lib/calendar/utils/secondsSinceMidnight";
import { breakpoints, media } from "../../../styles/breakpoints";
import relativelyReadableColor from "../../../styles/utils/relativelyReadableColor";
import Time from "../../typography/atomics/Time";

export interface CalendarEventDisplayProps {
  calendarEvent: CalendarEventInstance;
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

  const startInSeconds = secondsSinceMidnight(start);
  const endInSeconds = startInSeconds + duration;
  const compact = duration <= 1800;

  return (
    <div css={{
      position: "absolute",
      top: `calc(var(--hour-height) * ${startInSeconds} / 3600)`,
      borderTop: `1px solid ${color}`,
      boxSizing: "border-box",
      height: `calc(var(--hour-height) * ${duration} / 3600)`,
      width: "100%",
      paddingTop: "var(--cell-spacing)",
    }}
    >
      <div css={[{
        height: "100%",
        width: "100%",
        backgroundColor: color,
        color: relativelyReadableColor(color),
        padding: compact ? 6 : 8,
        boxSizing: "border-box",
        borderRadius: 6,
        wordBreak: "break-word",

        "@media (prefers-color-scheme: dark)": {
          backgroundColor: transparentize(0.8, color),
          color: "#fff",
        },
      }, compact ? {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
      } : {
        [media(breakpoints.extraLarge)]: {
          padding: 12,
        },
      }]}
      >
        <span css={{
          margin: 0,
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "-0.022em",
          opacity: 0.5,
          lineHeight: 1.1,
          display: "inline-block",

          [media(breakpoints.extraLarge)]: {
            fontSize: 14,
          },
        }}
        >
          <Time>
            {getHumanReadableDuration(startInSeconds)}
            <span css={{
              display: "none",

              [media(breakpoints.medium)]: {
                display: "inline",
              },
            }}
            >
              –
              {getHumanReadableDuration(endInSeconds)}
            </span>
          </Time>
          {location ? (
            <>
              {" · "}
              <span>{location}</span>
            </>
          ) : undefined}
        </span>
        <h2 css={{
          margin: 0,
          marginTop: compact ? undefined : "0.5em",
          marginRight: compact ? 4 : undefined,
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "-0.022em",

          [media(breakpoints.large)]: {
            fontSize: 16,
          },

          [media(breakpoints.extraLarge)]: {
            fontSize: 18,
          },
        }}
        >
          {summary}
        </h2>
      </div>
    </div>
  );
};

export default CalendarEventDisplay;
