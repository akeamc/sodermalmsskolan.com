import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
import { CalendarContextProvider } from "../../../lib/calendar/CalendarContext";
import MainCalendar from ".";

describe("<MainCalendar /> tests", () => {
  test("the heading should display the cursor", () => {
    const initialCursor = DateTime.utc(2020, 1, 1, 6, 30);

    render(
      <CalendarContextProvider initialCursor={initialCursor}>
        <MainCalendar />
      </CalendarContextProvider>,
    );

    const expected = new RegExp(initialCursor.toLocaleString({
      year: "numeric",
      month: "long",
    }), "i");

    expect(screen.getByText(expected)).toBeDefined();
  });
});
