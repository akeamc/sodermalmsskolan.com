import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useBasicRoutes } from "../../lib/sitemap/routes";
import MainNavbar from "./MainNavbar";

describe("<MainNavbar /> test", () => {
  it("should contain the correct routes", () => {
    render(<MainNavbar />);

    const { result } = renderHook(() => useBasicRoutes());
    const routes = result.current;

    routes.forEach(({ name }) => {
      expect(screen.getAllByText(name)).toHaveLength(1);
    });
  });
});
