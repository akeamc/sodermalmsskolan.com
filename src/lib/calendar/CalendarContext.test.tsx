import { render } from "@testing-library/react";
import { isFunction } from "lodash";
import React from "react";
import CalendarContext from "./CalendarContext";

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
});
