import React from "react";
import { render } from "@testing-library/react";
import InlineSkeleton from "./InlineSkeleton";

test("<InlineSkeleton />", () => {
  const result = render(<InlineSkeleton />);

  expect(result.asFragment()).toMatchSnapshot();
});
