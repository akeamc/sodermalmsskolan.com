import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import Badge, { BadgeProps } from "../../Badge";

/**
 * A badge showing the week number of the cursor.
 *
 * @param {React.PropsWithChildren<BadgeProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered badge.
 */
const WeekNumberBadge: FunctionComponent<BadgeProps> = (props) => {
  const { cursor } = useCalendarContext();

  return (
    <Badge {...props}>
      Vecka
      {" "}
      {cursor.weekNumber}
    </Badge>
  );
};

export default WeekNumberBadge;
