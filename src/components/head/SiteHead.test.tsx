import { render } from "@testing-library/react";
import React from "react";
import SiteHead from "./SiteHead";

jest.mock("../../lib/analytics/gtag");

describe("<SiteHead /> test", () => {
  it("should render correctly", () => {
    const result = render(<SiteHead />);

    expect(result.asFragment()).toMatchSnapshot();
  });
});
