import { render } from "@testing-library/react";
import { capitalize } from "lodash";
import { DateTime } from "luxon";
import React from "react";
import MenuCursor from "./MenuCursor";

describe("<MenuCursor /> tests", () => {
  it("should work as expected", () => {
    const date = DateTime.utc(2020, 1, 1);

    const weekResult = render(<MenuCursor cursor={date} scope="week" />);
    expect(weekResult.asFragment().textContent).toBe("Vecka 1");

    const weekWithYearResult = render(<MenuCursor cursor={date} scope="week" showYear />);
    expect(weekWithYearResult.asFragment().textContent).toBe("Vecka 1 2020");

    const monthResult = render(<MenuCursor cursor={date} scope="month" />);
    expect(monthResult.asFragment().textContent).toBe(capitalize(date.toLocaleString({
      month: "long",
      year: "numeric",
    })));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fallbackResult = render(<MenuCursor cursor={date} scope={"invalid" as any} />);
    expect(fallbackResult.asFragment().textContent).toBe(date.toLocaleString(DateTime.DATE_FULL));
  });

  it("should fall back to skeletons", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { asFragment } = render(<MenuCursor cursor={false as any} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
