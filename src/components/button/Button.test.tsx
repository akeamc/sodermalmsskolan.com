import renderer from "react-test-renderer";
import React from "react";
import Button from "./Button";

describe("button test", () => {
  it("should render primary buttons correctly", () => {
    const tree = renderer
      .create(<Button primary>My primary button</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render small buttons correctly", () => {
    const tree = renderer
      .create(<Button size="small">My small button</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
