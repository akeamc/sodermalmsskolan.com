import { render } from "@testing-library/react";
import React from "react";
import Emoji from ".";

describe("<Emoji /> test", () => {
  it("should render standalone emojis correctly", () => {
    const { asFragment } = render(<Emoji>🐢</Emoji>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render inline emojis correctly", () => {
    const { asFragment } = render(
      // eslint-disable-next-line jsx-a11y/accessible-emoji
      <Emoji>
        Hello 🐢.
        <span>
          Do
          <span>
            you
            <span>
              even
              <span>
                nest
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <span>
                  🐢
                  <span>?</span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </Emoji>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
