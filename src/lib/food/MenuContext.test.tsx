import { render } from "@testing-library/react";
import { isFunction } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import MenuContext, { MenuContextProvider } from "./MenuContext";

describe("menu context tests", () => {
  test("default functions should throw", () => {
    render(
      <MenuContext.Consumer>
        {(value) => {
          Object.values(value).filter(isFunction).forEach((func) => {
            expect(func).toThrow();
          });

          return (
            <span>dummy consumer</span>
          );
        }}
      </MenuContext.Consumer>,
    );
  });

  test("the default `initialCursor` should be `DateTime.now()`", () => {
    const spy = jest.spyOn(DateTime, "now");

    render(
      <MenuContextProvider />,
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
