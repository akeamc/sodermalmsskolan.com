import { render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
import WeekNumberBadge from ".";
import { CalendarContextProvider } from "../../../lib/calendar/CalendarContext";

test("badge should show correct date", () => {
  render(
    <CalendarContextProvider initialCursor={DateTime.utc(2020, 6, 8, 12)}>
      <WeekNumberBadge />
    </CalendarContextProvider>,
  );

  expect(screen.getByText(/^vecka [0-9]+$/i).textContent).toBe("Vecka 24");
});
