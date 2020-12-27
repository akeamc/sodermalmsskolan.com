import { css } from "@emotion/react";
import { darken } from "polished";
import React, { FunctionComponent } from "react";
import { CalendarEvent, humanReadableTime } from "../../lib/calendar/event";
import { useHighlightedTag } from "../../lib/calendar/HighlightedTagContext";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import Emoji from "../Emoji";
import Skeleton from "../skeleton/Skeleton";

export interface CalendarEventViewProps extends CalendarEvent {
  /**
   * The number of seconds since midnight.
   */
  start: number;

  width?: number;

  left?: number;
}

const hideIfTable = css({
  [media(breakpoints.large)]: {
    display: "none",
  },
});

const CalendarEventView: FunctionComponent<CalendarEventViewProps> = ({
  start,
  duration,
  title,
  shortTitle,
  color,
  location,
  tag,
  canceled = false,
  description,
  placeholder = false,
  width = 1,
  left = 0,
}) => {
  const minified = width < 1;

  const [highlightedTag, setHighlightedTag] = useHighlightedTag();

  return (
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
        width: `${width * 100}%`,
        left: `${left * 100}%`,
        margin: 0,
      },
    }}
    >
      {placeholder ? <Skeleton width="100%" height="100%" /> : (
        <div
          css={[{
            backgroundColor: color,
            borderRadius: "0.3125rem",
            borderLeft: `4px solid ${darken(0.1, color)}`,
            boxSizing: "border-box",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem",
            color: "#ffffff",
            height: "100%",
            position: "relative",
            transition: "opacity 0.1s",

            "&:hover": {
              zIndex: 1,
            },
          }, canceled ? {
            opacity: 0.5,
            filter: "grayscale(1)",
            cursor: "not-allowed",
          } : null, (highlightedTag && tag !== highlightedTag) ? {
            opacity: 0.1,
          } : null]}
          onMouseEnter={() => setHighlightedTag(tag)}
          onMouseLeave={() => setHighlightedTag(null)}
        >
          <div css={{
            fontFamily: fonts.monospace,
            fontSize: "0.8125rem",
            fontWeight: 400,
            opacity: 0.7,
            lineHeight: 1,
            marginBottom: "0.5rem",
            display: "inline-block",

            "> *:not(:first-child)::before": {
              content: "\" · \"",
            },
          }}
          >
            {tag ? (
              <span>
                {tag}
              </span>
            ) : null}

            <span css={tag && minified ? hideIfTable : null}>
              <time>
                {humanReadableTime(start)}
                <span css={minified ? hideIfTable : null}>
                  –
                  {humanReadableTime(start + duration)}
                </span>
              </time>
            </span>

            <span css={minified ? hideIfTable : null}>
              {location}
            </span>
          </div>
          <div css={{
            fontSize: "1rem",
            fontWeight: 500,
          }}
          >
            <Emoji>{minified ? shortTitle || title : title}</Emoji>
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
};

export default CalendarEventView;
