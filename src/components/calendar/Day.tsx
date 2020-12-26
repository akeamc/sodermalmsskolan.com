import dayjs from "dayjs";
import React, { FunctionComponent } from "react";
import useLocale from "../../hooks/useLocale";
import { breakpoints, media } from "../../styles/breakpoints";
import InlineSkeleton from "../skeleton/InlineSkeleton";
import { SectionHeading } from "../text/headings";

export interface CalendarDayProps {
  /**
   * The index of the weekday, starting from 0 with **Monday**.
   */
  weekday: number;
  placeholder?: boolean;
}

const CalendarDay: FunctionComponent<CalendarDayProps> = ({
  weekday,
  children,
  placeholder = false,
}) => {
  const { language } = useLocale();

  const dayText = placeholder ? <InlineSkeleton width="4em" /> : dayjs().locale(language).day(weekday + 1).format("dddd"); // DayJS uses 0 for Sunday, we use 0 for Monday.

  return (
    <section css={{
      flex: 1,

      [media(breakpoints.large)]: {
        borderRight: "1px solid #eee",

        "&:first--of-type": {
          borderLeft: "1px solid #eee",
        },
      },
    }}
    >
      <div css={{
        textTransform: "capitalize",

        [media(breakpoints.large)]: {
          height: "var(--header-height)",
          textAlign: "center",
        },
      }}
      >
        <SectionHeading css={{
          margin: "2rem 0 1rem",

          [media(breakpoints.large)]: {
            display: "none",
          },
        }}
        >
          {dayText}
        </SectionHeading>
        <span css={{
          display: "none",
          lineHeight: "var(--header-height)",
          fontWeight: 500,
          fontSize: "1rem",

          [media(breakpoints.large)]: {
            display: "inline",
          },
        }}
        >
          {dayText}
        </span>
      </div>
      <div css={{
        position: "relative",

        [media(breakpoints.large)]: {
          height: "calc(var(--rows) * var(--row-height))",
        },
      }}
      >
        {children}
      </div>
    </section>
  );
};

export default CalendarDay;
