import { render } from "@testing-library/react";
import React from "react";
import Math from "./Math";

describe("<Math /> test", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Math math="E=mc^2" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
