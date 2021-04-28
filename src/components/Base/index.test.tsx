import React from "react";
import { render } from "@testing-library/react";
import Base from ".";

test("<Base />", () => {
  const result = render(<Base />);

  expect(result.asFragment()).toMatchSnapshot();
});
