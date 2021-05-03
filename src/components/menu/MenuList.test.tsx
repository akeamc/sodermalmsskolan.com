import { render, screen } from "@testing-library/react";
import React from "react";
import Menu from "../../lib/food/Menu";
import { MenuListDisplay } from "./MenuList";

describe("<MenuList /> tests", () => {
  it("should return some helpful text if there are no menus", () => {
    const { asFragment } = render(<MenuListDisplay menus={[]} expectedCount={5} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display all of the menus", () => {
    const menus: Menu[] = [{
      date: "2020-01-01",
      dishes: ["Tacobuffé", "Fisk Björkeby"],
    }, {
      date: "2020-01-02",
      dishes: ["Pannkakor", "Pizza"],
    }, {
      date: "2020-01-03",
      dishes: ["Hamburgare", "Köttbullar"],
    }];

    render(<MenuListDisplay menus={menus} expectedCount={0} />);

    menus.flatMap((menu) => menu.dishes).forEach((dish) => {
      expect(screen.getByText(dish)).toBeDefined();
    });
  });

  it("should fall back to skeletons", () => {
    const { asFragment } = render(<MenuListDisplay menus={undefined} expectedCount={5} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
