import useWindowSize from "../../../hooks/useWindowSize";
import { CalendarScope } from "../CalendarContext";

/**
 * Return the most fitting `CalendarScope` based on the viewport width.
 *
 * @returns {CalendarScope} The most fitting calendar scope.
 */
const useResponsiveCalendarScope = (): CalendarScope => {
  const { width } = useWindowSize();

  if (width > 768) {
    return "week";
  }

  return "day";
};

export default useResponsiveCalendarScope;
