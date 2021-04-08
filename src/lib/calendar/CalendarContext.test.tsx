import { render } from "@testing-library/react";
import { isFunction } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import CalendarContext, { CalendarContextProvider } from "./CalendarContext";

describe("calendar context tests", () => {
  test("default functions should throw", () => {
    render(
      <CalendarContext.Consumer>
        {(value) => {
          Object.values(value).filter(isFunction).forEach((func) => {
            expect(func).toThrow();
          });

          return (
            <span>dummy consumer</span>
          );
        }}
      </CalendarContext.Consumer>,
    );
  });

  test("the default `initialCursor` should be equal to `DateTime.now()`", () => {
    const spy = jest.spyOn(DateTime, "now");

    render(
      <CalendarContextProvider />,
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
