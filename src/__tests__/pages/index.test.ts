import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("homepage test", () => {
  jest.unmock("next/head");

  it("should render correctly", async () => {
    jest.setTimeout(10000);

    const { render } = await getPage({
      route: "/",
    });

    render();

    expect(screen.getAllByText("Meny")).toHaveLength(1);
  });
});
