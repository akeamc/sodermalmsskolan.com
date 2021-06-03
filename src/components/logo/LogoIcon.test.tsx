import { render } from "@testing-library/react";
import React from "react";
import LogoIcon from "./LogoIcon";

test("<LogoIcon />", () => {
  const result = render(<LogoIcon />);

  expect(result.asFragment()).toMatchSnapshot();
});
