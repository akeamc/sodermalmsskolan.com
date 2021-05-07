import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("about us test", () => {
  jest.unmock("next/head");

  it("should render correctly", async () => {
    // For some reason, the test fails on GitHub Actions if this log statement is missing.
    // I just want my tests to pass.
    // eslint-disable-next-line no-console
    console.log(process.cwd());

    const { render } = await getPage({
      route: "/om",
    });

    render();

    expect(screen.getByText(/©/)).toBeDefined();
  });
});
