import { render, screen } from "@testing-library/react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import Menu from "../../lib/food/Menu";
import MenuDisplay from "./MenuDisplay";

describe("<MenuDisplay /> test", () => {
  it("should render correctly", () => {
    const menu: Menu = {
      date: "2020-01-01",
      dishes: ["Fisk Björkeby", "Tacobuffé"],
    };

    render(<MenuDisplay menu={menu} />);

    const expectedHeading = capitalize(DateTime.utc(2020, 1, 1).toLocaleString(DateTime.DATE_HUGE));

    expect(screen.getByText(/jan/i).textContent).toBe(expectedHeading);
  });

  it("should return a skeleton if the menu is undefined", () => {
    const { asFragment } = render(<MenuDisplay menu={undefined} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
