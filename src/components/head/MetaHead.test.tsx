import React from "react";
import { render } from "@testing-library/react";
import { MetaHead } from "./MetaHead";

describe("test page head", () => {
  it("should render correctly", () => {
    const result = render(
      <MetaHead
        metadata={{
          title: "test page",
          description: "an interesting description",
          type: "website",
          images: ["https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg"],
        }}
      />,
    );
    expect(result.asFragment()).toMatchSnapshot();
  });
});
