import { render } from "@testing-library/react";
import React from "react";
import Emphasis from "./Emphasis";

describe("emphasis", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Emphasis>Important text</Emphasis>);

    expect(asFragment()).toMatchSnapshot();
  });
});
