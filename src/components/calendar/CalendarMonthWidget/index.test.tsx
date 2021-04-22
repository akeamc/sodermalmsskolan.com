import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateTime } from "luxon";
import React from "react";
import CalendarMonthWidget from ".";
import CalendarContext, { CalendarContextProvider } from "../../../lib/calendar/CalendarContext";

describe("<CalendarMonthWidget /> tests", () => {
  test("misc. buttons should be clickable", () => {
    const initialCursor = DateTime.fromISO("2021-01-14T07:30:00", {
      zone: "utc",
    });

    render(
      <CalendarContextProvider initialCursor={initialCursor}>
        <CalendarMonthWidget />
        <CalendarContext.Consumer>
          {({ cursor }) => (
            <span>
              Cursor:
              {" "}
              {cursor.toISO()}
            </span>
          )}
        </CalendarContext.Consumer>
      </CalendarContextProvider>,
    );

    // eslint-disable-next-line require-jsdoc
    const getCursor = () => screen.getByText(/^Cursor:/).textContent;

    expect(getCursor()).toBe("Cursor: 2021-01-14T07:30:00.000Z");

    userEvent.click(screen.getByText("10"));
    expect(getCursor()).toBe("Cursor: 2021-01-10T00:00:00.000Z");

    userEvent.click(screen.getByTitle(/nästa/i));
    expect(getCursor()).toBe("Cursor: 2021-02-01T00:00:00.000Z");

    userEvent.click(screen.getByTitle(/föregående/i));
    expect(getCursor()).toBe("Cursor: 2021-01-01T00:00:00.000Z");
  });
});
