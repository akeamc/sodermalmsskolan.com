import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("404 test", () => {
  jest.unmock("next/head");

  it("should render correctly", async () => {
    const { render } = await getPage({
      route: "/404",
    });

    render();

    expect(screen.getByText(/Omdirigerar/i).getAttribute("value")).toBe("/");
  });
});
