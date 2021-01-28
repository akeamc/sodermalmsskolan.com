import renderer from "react-test-renderer";
import React from "react";
import { Info } from "react-feather";
import { IconParagraph } from "./paragraphs";

describe("icon paragraph", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<IconParagraph icon={Info}>Sample text</IconParagraph>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
