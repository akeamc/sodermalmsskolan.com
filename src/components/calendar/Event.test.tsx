import { cleanup, render } from "@testing-library/react";
import dayjs from "dayjs";
import React from "react";
import secondsSinceMidnight from "../../lib/calendar/utils/secondsSinceMidnight";
import CalendarEventView, { CalendarEventViewProps } from "./Event";

const startDate = dayjs("2020-01-01 8:10");
const start = secondsSinceMidnight(startDate.toDate());

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Use a pre-filled object to get props.
 *
 * @param {DeepPartial<CalendarEventViewProps>} partialProps Partial props.
 *
 * @returns {CalendarEventViewProps} The complete props.
 */
const getEventProps = (
  partialProps: DeepPartial<CalendarEventViewProps> = {},
): CalendarEventViewProps => ({
  start,
  data: {
    duration: 3900,
    title: "My event",
    deltaStart: 0,
    deltaDuration: 0,
    characteristics: ["1"],
    signature: "1",
    ...partialProps?.data,
  },
});

describe("<CalendarEventView />", () => {
  afterEach(cleanup);

  it("renders properly", () => {
    const { container } = render(<CalendarEventView {...getEventProps()} />);

    expect(container).toMatchSnapshot();
  });

  it("renders properly as a placeholder", () => {
    const { container } = render(
      <CalendarEventView
        {...getEventProps({
          data: {
            placeholder: true,
          },
        })}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
