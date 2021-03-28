import { shade } from "polished";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";
import CalendarEventInstance from "../../lib/calendar/event/CalendarEventInstance";
import { getHumanReadableDuration } from "../../lib/calendar/utils/humanReadable";
import secondsSinceMidnight from "../../lib/calendar/utils/secondsSinceMidnight";
import relativelyReadableColor from "../../styles/utils/relativelyReadableColor";

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
  calendarEvent: {
    details: {
      summary,
      color = "#ff0000",
      duration,
      location,
    },
    start,
  },
}) => {
  const {
    scope,
  } = useCalendarContext();

  const seconds = secondsSinceMidnight(start);

  return (
    <div css={[{

    }, scope === "week" ? {
      position: "absolute",
      top: `calc(var(--hour-height) * ${seconds} / 3600)`,
      borderTop: `1px solid ${color}`,
      boxSizing: "border-box",
      height: `calc(var(--hour-height) * ${duration} / 3600)`,
      width: "100%",
      paddingTop: "var(--cell-spacing)",
    } : undefined]}
    >
      <div css={{
        height: "100%",
        width: "100%",
        backgroundColor: color,
        color: relativelyReadableColor(color),
        padding: 12,
        boxSizing: "border-box",
        borderRadius: 4,

        "@media (prefers-color-scheme: dark)": {
          backgroundColor: shade(0.75, color),
          color: "#fff",
        },
      }}
      >
        <h3 css={{
          margin: 0,
          fontWeight: 500,
          fontSize: 16,
          letterSpacing: "-0.022em",
        }}
        >
          <time css={{
            fontFeatureSettings: "\"ss01\", \"tnum\"",
          }}
          >
            {getHumanReadableDuration(seconds)}
          </time>
          {location ? (
            <>
              {" · "}
              <span>{location}</span>
            </>
          ) : undefined}
        </h3>
        <h2 css={{
          margin: 0,
          marginTop: 12,
          fontWeight: 500,
          fontSize: 24,
          letterSpacing: "-0.022em",
        }}
        >
          {summary}
        </h2>
      </div>
    </div>
  );
};

export default CalendarEventDisplay;
