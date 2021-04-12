import { act, render, screen } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
import userEvent from "@testing-library/user-event";
import preloadAll from "jest-next-dynamic";
import CalendarContext, { CalendarContextProvider, CalendarScope, defaultCalendarContextData } from "../../../lib/calendar/CalendarContext";
import MainCalendar from ".";

beforeAll(async () => {
  await preloadAll();
});

describe("<MainCalendar /> tests", () => {
  test("the heading should display the cursor", async () => {
    const initialCursor = DateTime.utc(2020, 1, 1, 6, 30);

    render(
      <CalendarContextProvider initialCursor={initialCursor}>
        <MainCalendar />
      </CalendarContextProvider>,
    );

    await act(async () => {});

    const expected = new RegExp(initialCursor.toLocaleString({
      year: "numeric",
      month: "long",
    }), "i");

    expect(screen.getByText(expected)).toBeDefined();
  });

  test("scope should be changeable with keyboard", async () => {
    render(
      <CalendarContextProvider>
        <MainCalendar />
        <CalendarContext.Consumer>
          {({ scope }) => (
            <code title="scope">{scope}</code>
          )}
        </CalendarContext.Consumer>
      </CalendarContextProvider>,
    );

    await act(async () => {});

    // eslint-disable-next-line require-jsdoc
    const getScope = (): CalendarScope => screen.getByTitle("scope").textContent as CalendarScope;

    userEvent.keyboard("Q"); // Resilience
    expect(getScope()).toBe<CalendarScope>(defaultCalendarContextData.scope);

    userEvent.keyboard("W");
    expect(getScope()).toBe<CalendarScope>("week");

    userEvent.keyboard("D");
    userEvent.keyboard("Z"); // Resilience
    expect(getScope()).toBe<CalendarScope>("day");
  });
});
