import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateTime } from "luxon";
import React from "react";
import MenuContext, { MenuContextProvider } from "../../lib/food/MenuContext";
import MenuToolbar from "./MenuToolbar";

test("toolbar should work as expected", () => {
  const initialCursor = DateTime.fromISO("2021-01-14T07:30:00", {
    zone: "utc",
  });

  render(
    <MenuContextProvider initialCursor={initialCursor}>
      <MenuToolbar />
      <MenuContext.Consumer>
        {({ cursor }) => (
          <time title="cursor">
            {cursor?.toISO()}
          </time>
        )}
      </MenuContext.Consumer>
    </MenuContextProvider>,
  );

  // eslint-disable-next-line require-jsdoc
  const getCursor = () => screen.getByTitle("cursor").textContent;

  expect(getCursor()).toBe("2021-01-14T07:30:00.000Z");

  userEvent.click(screen.getByTitle(/nästa/i));
  expect(getCursor()).toBe("2021-01-18T00:00:00.000Z");

  userEvent.click(screen.getByTitle(/föregående/i));
  expect(getCursor()).toBe("2021-01-11T00:00:00.000Z");
});
