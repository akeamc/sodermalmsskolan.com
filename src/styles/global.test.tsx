import React from "react";
import renderer from "react-test-renderer";
import { globalStyles, GlobalStyles } from "./global";

describe("global stylesheet test", () => {
  it("returns the same styles as always", () => {
    expect(globalStyles.styles).toMatchSnapshot();
  });
});

describe("<GlobalStyles /> component test", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<GlobalStyles />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
