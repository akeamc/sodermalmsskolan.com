import { render, screen } from "@testing-library/react";
import React from "react";
import Button from ".";

describe("<Button /> tests", () => {
  it("should render correctly", () => {
    render(<Button>Example label</Button>);

    expect(screen.getByText(/label/i).textContent).toBe("Example label");
  });
});
