import { renderHook } from "@testing-library/react-hooks";
import dayjs from "dayjs";
import usePlaceholderEvents from "./usePlaceholderEvents";

describe("usePlaceholderEvents test", () => {
  const after = dayjs("2020-01-01");
  const before = dayjs("2020-01-05");

  it("should return the specified number of events", () => {
    const eventsPerDay = Math.ceil(Math.random() * 10);

    const { result } = renderHook(() => usePlaceholderEvents(after, before, eventsPerDay));

    expect(result.current).toHaveLength(eventsPerDay * 5);
  });

  it("should be persistent", () => {
    const eventsPerDay = Math.ceil(Math.random() * 10);

    const { result: result1 } = renderHook(() => usePlaceholderEvents(after, before, eventsPerDay));
    const { result: result2 } = renderHook(() => usePlaceholderEvents(after, before, eventsPerDay));

    expect(result1.current).toEqual(result2.current);
  });
});
