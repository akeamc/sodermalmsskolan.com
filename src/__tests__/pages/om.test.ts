import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("about us test", () => {
  jest.unmock("next/head");

  it("should render correctly", async () => {
    jest.setTimeout(10000);

    const { render } = await getPage({
      route: "/om",
    });

    render();

    expect(screen.getByText(/©/)).toBeDefined();
  });
});
