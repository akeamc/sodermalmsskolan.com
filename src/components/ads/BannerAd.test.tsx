import React from "react";
import { render } from "@testing-library/react";
import BannerAd from "./BannerAd";

test("<BannerAd />", () => {
  const result = render(<BannerAd />);

  expect(result.asFragment()).toMatchSnapshot();
});
