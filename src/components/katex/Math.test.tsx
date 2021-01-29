import React from "react";
import renderer from "react-test-renderer";
import Math from "./Math";

describe("<Math /> test", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Math math="E=mc^2" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
