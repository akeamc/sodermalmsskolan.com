import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FunctionComponent, useCallback, useState } from "react";
import useKeypressEffect from "./useKeypressEffect";

/**
 * Test component displaying the most recently pressed key code.
 *
 * @returns {React.ReactElement} The rendered component.
 */
const KeypressComponent: FunctionComponent = () => {
  const [key, setKey] = useState<string>();

  const callback = useCallback((event: KeyboardEvent) => setKey(event.code), []);

  useKeypressEffect(callback);

  return (
    <kbd title="key">{key}</kbd>
  );
};

describe("useKeypressEffect test", () => {
  it("should register keypress events", () => {
    render(
      <KeypressComponent />,
    );

    /**
     * Get the keycode from the test component.
     *
     * @returns {string} The keycode.
     */
    const keycode = () => screen.getByTitle("key").textContent;

    expect(keycode()).toBe("");

    userEvent.keyboard("A");
    expect(keycode()).toBe("KeyA");

    userEvent.keyboard("0");
    expect(keycode()).toBe("Digit0");
  });
});
