import React from "react";
import renderer from "react-test-renderer";
import Emphasis from "./Emphasis";

describe("emphasis", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Emphasis>Important text</Emphasis>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
