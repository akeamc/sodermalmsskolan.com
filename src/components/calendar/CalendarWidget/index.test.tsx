import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateTime } from "luxon";
import React from "react";
import CalendarWidget from ".";
import CalendarContext, { CalendarContextProvider } from "../../../lib/calendar/CalendarContext";

it("should be clickable", () => {
  const initialCursor = DateTime.fromISO("2021-01-14T07:30:00", {
    zone: "utc",
  });
  const cursorRegExp = /^Cursor:/;

  render(
    <CalendarContextProvider initialCursor={initialCursor}>
      <CalendarWidget />
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

  expect(screen.getByText(cursorRegExp).textContent).toBe("Cursor: 2021-01-14T07:30:00.000Z");

  userEvent.click(screen.getByText("10"));
  expect(screen.getByText(cursorRegExp).textContent).toBe("Cursor: 2021-01-10T00:00:00.000Z");
});
