import { act, render, screen } from "@testing-library/react";
import React, { FunctionComponent } from "react";
import useWindowDimensions from "./useWindowDimensions";

test("useWindowDimensions", () => {
  // eslint-disable-next-line require-jsdoc
  const TestComponent: FunctionComponent = () => {
    const { width, height } = useWindowDimensions();

    return (
      <data title="dimensions">
        {width}
        x
        {height}
      </data>
    );
  };

  render(<TestComponent />);

  expect(screen.getByTitle("dimensions").textContent).toBe("1024x768");

  global.innerWidth = 1920;
  global.innerHeight = 1080;
  act(() => { global.dispatchEvent(new Event("resize")); });

  expect(screen.getByTitle("dimensions").textContent).toBe("1920x1080");
});
