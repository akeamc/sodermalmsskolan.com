import React from "react";
import { render } from "@testing-library/react";
import Ad from "./Ad";

test("<Ad />", () => {
  const result = render(<Ad />);

  expect(result.asFragment()).toMatchSnapshot();
});
