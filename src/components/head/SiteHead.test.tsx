import { render } from "@testing-library/react";
import React from "react";
import SiteHead from "./SiteHead";

describe("<SiteHead /> test", () => {
  it("should render correctly", () => {
    const result = render(<SiteHead />);

    expect(result.asFragment()).toMatchSnapshot();
  });
});
