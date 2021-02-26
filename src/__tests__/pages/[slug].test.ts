import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("blog page test", () => {
  jest.unmock("next/head");

  it("should render the `about us` page correctly", async () => {
    const { render } = await getPage({
      route: "/om-oss",
      useDocument: true,
    });

    render();

    expect(screen.getAllByText("Om oss")).toHaveLength(2);
    expect(screen.getAllByText("Kontakta oss")).toHaveLength(1);
    expect(screen.getAllByText("ake.amcoff@södermalmsskolan.com")).toHaveLength(1);
  });
});
