import renderer from "react-test-renderer";
import React from "react";
import { MetaHead } from "./MetaHead";

describe("test page head", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <MetaHead
          metadata={{
            title: "test page",
            description: "an interesting description",
            type: "website",
            images: ["https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg"],
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
