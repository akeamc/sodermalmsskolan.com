import React from "react";
import { render } from "@testing-library/react";
import { MetaHead } from "./MetaHead";

describe("<MetaHead /> test", () => {
  it("should render correctly with specific parameters", () => {
    const result = render(
      <MetaHead
        title="test page"
        description="an interesting description"
        type="website"
        images={["https://cdn.discordapp.com/attachments/575993879837409290/576074256723476491/IMG_20190507_121005.jpg"]}
      />,
    );
    expect(result.asFragment()).toMatchSnapshot();
  });

  it("should work fine without parameters", () => {
    const result = render(<MetaHead />);

    expect(result.asFragment()).toMatchSnapshot();
  });

  it("should return a noindex meta tag if desired", () => {
    const result = render(<MetaHead noIndex />);

    const robotsMeta = result.asFragment().querySelector("meta[name=robots]");

    expect(robotsMeta.getAttribute("content")).toBe("noindex");
  });

  it("should return proper OpenGraph parameters for articles", () => {
    const result = render(
      <MetaHead
        type="article"
        article={{
          published: new Date("2020-01-01"),
          modified: new Date("2020-06-11"),
        }}
      />,
    );

    expect(result.asFragment()).toMatchSnapshot();
  });
});
