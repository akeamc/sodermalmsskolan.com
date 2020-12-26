import React, { FunctionComponent } from "react";
import { humanReadableTime } from "../../lib/calendar/event";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface CalendarLabelProps {
  rowCount: number,
  rowPadStart: number,
  rowDuration: number,
  placeholder?: boolean,
}

const CalendarLabels: FunctionComponent<CalendarLabelProps> = ({
  rowCount,
  rowPadStart,
  rowDuration,
  placeholder = false,
}) => (
  <div css={{
    position: "absolute",
    top: "var(--header-height)",
    left: 0,
    width: "100%",
  }}
  >
    {Array.from({
      length: rowCount + 1, // Include both starting and finishing time label
    }).map((_, index) => {
      const totalSeconds = (index + rowPadStart) * rowDuration;

      return (
        <div
          key={totalSeconds}
          css={{
            height: "var(--row-height)",
            position: "relative",

            "&::after": {
              content: "\"\"",
              height: "1px",
              width: "calc(100% - var(--labels-width))",
              left: "var(--labels-width)",
              backgroundColor: "#eee",
              position: "absolute",
              top: 0,
              display: "none",

              [media(breakpoints.large)]: {
                display: "block",
              },
            },
          }}
        >
          <span css={{
            position: "absolute",
            top: "-0.5em",
            lineHeight: 1,
            left: 0,
            fontFamily: fonts.monospace,
            fontSize: "0.875rem",
            opacity: 0.7,
            display: "none",

            [media(breakpoints.extraLarge)]: {
              display: "inline-block",
            },
          }}
          >
            {placeholder ? <InlineSkeleton width="3em" /> : humanReadableTime(totalSeconds, true)}
          </span>
        </div>
      );
    })}
  </div>
);

export default CalendarLabels;
