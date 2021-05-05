import React, { FunctionComponent, useRef } from "react";
import { render, screen } from "@testing-library/react";
import useElementOffsets from "./useElementOffsets";

describe("useElementOffset tests", () => {
  it("should return the proper offsets", async () => {
    // eslint-disable-next-line require-jsdoc
    const SampleComponent: FunctionComponent = () => {
      const elementRef = useRef();
      const { offsetTop } = useElementOffsets(elementRef);

      return (
        <div>
          <div ref={elementRef}>
            <data title="offset-top">{offsetTop}</data>
          </div>
        </div>
      );
    };

    render(<SampleComponent />);

    expect(screen.getByTitle("offset-top").textContent).toBe("0");
  });
});
