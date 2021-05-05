import React, { FunctionComponent, useRef } from "react";
import { render, screen } from "@testing-library/react";
import useElementOffsets from "./useElementOffsets";

describe("useElementOffset tests", () => {
  it("should return the proper offsets", async () => {
    // eslint-disable-next-line require-jsdoc
    const SampleComponent: FunctionComponent = () => {
      const elementRef = useRef();
      const { offsetTop, offsetWidth } = useElementOffsets(elementRef);

      return (
        <div>
          <div ref={elementRef}>
            <data title="top">{offsetTop}</data>
            <data title="width">{offsetWidth}</data>
          </div>
        </div>
      );
    };

    render(<SampleComponent />);

    expect(screen.getByTitle("top").textContent).toBe("0");
    expect(screen.getByTitle("width").textContent).toBe("0");
  });
});
