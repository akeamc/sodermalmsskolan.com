import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import { BadgeProps } from "../../Badge";
import WeekNumberBadge from "../../WeekNumberBadge";

/**
 * A badge showing the week number of the cursor.
 *
 * @param {React.PropsWithChildren<BadgeProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered badge.
 */
const CursorWeekNumberBadge: FunctionComponent<BadgeProps> = (props) => {
  const { cursor } = useCalendarContext();

  return (
    <WeekNumberBadge date={cursor} {...props} />
  );
};

export default CursorWeekNumberBadge;
