import { useMediaQuery } from "react-responsive";
import { breakpoints } from "../../../styles/breakpoints";
import { CalendarScope } from "../CalendarContext";

/**
 * Return the most fitting `CalendarScope` based on the viewport width.
 *
 * @returns {CalendarScope} The most fitting calendar scope.
 */
const useResponsiveCalendarScope = (): CalendarScope => {
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpoints.large}px)`,
  });

  return isLarge ? "week" : "day";
};

export default useResponsiveCalendarScope;
