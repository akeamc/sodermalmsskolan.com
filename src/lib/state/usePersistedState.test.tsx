import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { FunctionComponent } from "react";
import usePersistedState from "./usePersistedState";

/**
 * Test react component used for states.
 *
 * @returns {React.ReactElement} The rendered component.
 */
const TestStateComponent: FunctionComponent = () => {
  const [count, setCount] = usePersistedState<number>("test-counter", 0);

  return (
    <div>
      <h1 title="count">{count}</h1>
      <button
        onClick={() => setCount(count + 1)}
        type="button"
        title="increment"
      >
        Increment
      </button>
    </div>
  );
};

describe("persistent state tests", () => {
  it("should use localstorage", () => {
    render(
      <TestStateComponent />,
    );

    // eslint-disable-next-line require-jsdoc
    const getCount = () => parseInt(screen.getByTitle("count").textContent, 10);

    // eslint-disable-next-line require-jsdoc
    const increment = () => userEvent.click(screen.getByTitle("increment"));

    expect(getCount()).toBe(0);

    increment();
    expect(getCount()).toBe(1);

    cleanup();

    render(
      <TestStateComponent />,
    );

    increment();
    expect(getCount()).toBe(2);
  });
});
