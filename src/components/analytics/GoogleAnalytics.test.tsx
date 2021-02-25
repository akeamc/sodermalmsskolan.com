import { render } from "@testing-library/react";
import React from "react";
import ANALYTICS_ID from "../../lib/analytics/constants";
import GoogleAnalytics from "./GoogleAnalytics";

describe("<GoogleAnalytics /> test", () => {
  it("should return the correct tags", () => {
    const result = render(<GoogleAnalytics trackingId={ANALYTICS_ID} />);

    expect(result.asFragment()).toMatchSnapshot();
  });
});
