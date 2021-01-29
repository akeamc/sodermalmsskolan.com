import renderer from "react-test-renderer";
import React from "react";
import Emoji from ".";

describe("<Emoji /> test", () => {
  it("should render standalone emojis correctly", () => {
    const tree = renderer
      // eslint-disable-next-line jsx-a11y/accessible-emoji
      .create(<Emoji>🐢</Emoji>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render inline emojis correctly", () => {
    const tree = renderer
      .create(
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
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
