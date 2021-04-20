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
  test("scope should be changeable with keyboard", async () => {
    render(
      <CalendarContextProvider initialCursor={DateTime.utc(2020, 1, 1, 12)}>
        <MainCalendar />
        <CalendarContext.Consumer>
          {({ scope, cursor }) => (
            <>
              <code title="scope">{scope}</code>
              <time title="cursor">{cursor.toISO()}</time>
            </>
          )}
        </CalendarContext.Consumer>
      </CalendarContextProvider>,
    );

    await act(async () => {});

    // eslint-disable-next-line require-jsdoc
    const getScope = (): CalendarScope => screen.getByTitle("scope").textContent as CalendarScope;
    // eslint-disable-next-line require-jsdoc
    const getCursor = (): string => screen.getByTitle("cursor").textContent;

    userEvent.keyboard("Q"); // Resilience
    expect(getScope()).toBe<CalendarScope>(defaultCalendarContextData.scope);

    userEvent.keyboard("W");
    expect(getScope()).toBe<CalendarScope>("week");

    userEvent.keyboard("D");
    userEvent.keyboard("Z"); // Resilience
    expect(getScope()).toBe<CalendarScope>("day");

    userEvent.keyboard("{ArrowRight}");
    expect(getCursor()).toBe("2020-01-02T00:00:00.000Z");

    userEvent.keyboard("{ArrowLeft}");
    expect(getCursor()).toBe("2020-01-01T00:00:00.000Z");
  });
});
