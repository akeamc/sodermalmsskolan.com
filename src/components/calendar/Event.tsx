import { css } from "@emotion/react";
import { darken, transparentize } from "polished";
import React, { FunctionComponent, memo, PropsWithChildren } from "react";
import CalendarEvent from "../../lib/calendar/event/CalendarEvent";
import { useHighlightedTag } from "../../lib/calendar/HighlightedTagContext";
import { getHumanReadableDuration } from "../../lib/calendar/utils/humanReadable";
import { breakpoints, media } from "../../styles/breakpoints";
import { fonts } from "../../styles/text";
import relativelyReadableColor from "../../styles/utils/relativelyReadableColor";
import Emoji from "../Emoji";
import Skeleton from "../skeleton/Skeleton";

export interface CalendarEventViewProps {
  /**
   * The number of seconds since midnight.
   */
  start: number;
  width?: number;
  left?: number;
  data: CalendarEvent;
}

const hideIfTable = css({
  [media(breakpoints.large)]: {
    display: "none",
  },
});

/**
 * Display the times of a calendar event.
 *
 * @param {any} props The props.
 *
 * @returns {React.ReactElement} The rendered times.
 */
const CalendarEventTime: FunctionComponent<{
  start: number,
  duration: number,
  minified?: boolean,
}> = ({
  start,
  duration,
  minified = true,
}) => (
  <time>
    {getHumanReadableDuration(start)}
    <span css={minified ? hideIfTable : null}>
      –
      {getHumanReadableDuration(start + duration)}
    </span>
  </time>
);

/**
 * A box, essentially rendering a `CalendarEventInstance`.
 *
 * @param {PropsWithChildren<CalendarEventViewProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered elements.
 */
const CalendarEventView: FunctionComponent<CalendarEventViewProps> = ({
  start,
  data,
  width = 1,
  left = 0,
}) => {
  const {
    duration,
    title,
    shortTitle,
    color,
    location,
    tag,
    canceled = false,
    description,
    placeholder = false,
    deltaStart,
    deltaDuration,
  } = data;

  const actualStart = start + deltaStart;
  const actualDuration = duration + deltaDuration;

  const minified = width < 1;

  const [highlightedTag, setHighlightedTag] = useHighlightedTag();

  const isHidden = highlightedTag && tag !== highlightedTag;

  return (
    <li css={{
      width: "100%",
      height: "6rem",
      marginBottom: "1rem",
      boxSizing: "border-box",
      listStyle: "none",

      [media(breakpoints.large)]: {
        position: "absolute",
        top: `calc(((${actualStart} / var(--row-duration)) - var(--row-pad-start)) * var(--row-height))`,
        height: `calc((${actualDuration} / var(--row-duration)) * var(--row-height))`,
        width: `${width * 100}%`,
        left: `${left * 100}%`,
        margin: 0,
      },
    }}
    >
      {placeholder ? <Skeleton width="100%" height="100%" /> : (
        <button
          css={[{
            backgroundColor: color,
            borderRadius: "0.3125rem",
            border: 0,
            borderLeft: `4px solid ${darken(0.1, color)}`,
            boxSizing: "border-box",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "0.625rem",
            color: relativelyReadableColor(color),
            height: "100%",
            position: "relative",
            transition: "opacity 0.1s",
            display: "flex",
            flexDirection: "column",
            font: "inherit",
            textAlign: "left",
            width: "100%",
            outline: "none",
            cursor: "pointer",

            "@media (prefers-color-scheme: dark)": {
              backgroundColor: transparentize(0.5, color),
              borderColor: color,
              color: "#ffffff",
            },

            "&:hover": {
              zIndex: 1,
            },
          }, canceled ? {
            opacity: 0.5,
            filter: "grayscale(1)",
            cursor: "not-allowed",
          } : null, isHidden ? {
            opacity: 0.1,
          } : null]}
          onFocus={() => setHighlightedTag(tag)}
          onBlur={() => setHighlightedTag(null)}
          type="button"
        >
          <div css={{
            fontFamily: fonts.monospace,
            fontSize: "0.8125rem",
            fontWeight: 400,
            opacity: 0.7,
            lineHeight: 1,
            marginBottom: "0.5rem",
            display: "inline-block",

            "> *:not(:first-of-type)::before": {
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
              {deltaStart !== 0 || deltaDuration !== 0 ? (
                <>
                  <del>
                    <CalendarEventTime
                      start={start}
                      duration={duration}
                      minified={minified}
                    />
                  </del>
                  {" "}
                </>
              ) : null}
              <CalendarEventTime
                start={actualStart}
                duration={actualDuration}
                minified={minified}
              />
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
        </button>
      )}
    </li>
  );
};

export default memo(CalendarEventView);
