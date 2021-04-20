import { act, renderHook } from "@testing-library/react-hooks";
import { CalendarScope } from "../CalendarContext";
import useResponsiveCalendarScope from "./useResponsiveCalendarScope";

/**
 * Resize the window. Only for tests.
 *
 * @param {number} width New width.
 * @param {number} height New height.
 */
const resizeWindow = (width: number, height: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).innerWidth = width;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).innerHeight = height;
  window.dispatchEvent(new Event("resize"));
};

test("responsive calendar scope", () => {
  const { result } = renderHook(() => useResponsiveCalendarScope());

  expect(window.innerWidth).toBe(1024);
  expect(result.current).toBe<CalendarScope>("week");

  act(() => resizeWindow(375, 667));
  expect(result.current).toBe<CalendarScope>("day");

  act(() => resizeWindow(3840, 2160));
  expect(result.current).toBe<CalendarScope>("week");
});
