import React, { FunctionComponent, memo } from "react";
import { useCalendarContext } from "../../lib/calendar/CalendarContext";
import { getHumanReadableDuration } from "../../lib/calendar/utils/humanReadable";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import InlineSkeleton from "../skeleton/InlineSkeleton";

/**
 * Calendar time labels.
 *
 * @returns {React.ReactElement} The rendered labels.
 */
const CalendarLabels: FunctionComponent = () => {
  const {
    rowCount,
    rowPadStart,
    rowDuration,
    showPlaceholder,
  } = useCalendarContext();

  return (
    <div css={{
      position: "absolute",
      top: "var(--header-height)",
      left: 0,
      width: "100%",
      display: "none",

      [media(breakpoints.large)]: {
        display: "block",
      },
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
                backgroundColor: "var(--color-border-primary)",
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
              {showPlaceholder ? <InlineSkeleton width="3em" /> : getHumanReadableDuration(totalSeconds, true)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default memo(CalendarLabels);
