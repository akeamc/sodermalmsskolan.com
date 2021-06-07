import { render } from "@testing-library/react";
import React from "react";
import ANALYTICS_ID from "../../lib/analytics/constants";
import GoogleAnalytics from "./GoogleAnalytics";

describe("<GoogleAnalytics /> test", () => {
  it("should return the correct tags", () => {
    const { asFragment } = render(<GoogleAnalytics trackingId={ANALYTICS_ID} />);

    expect(asFragment()).toMatchSnapshot();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).gtag("event", "login");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { dataLayer } = window as any;
    expect(dataLayer[dataLayer.length - 1]).toMatchObject({ 0: "event", 1: "login" });
  });
});
