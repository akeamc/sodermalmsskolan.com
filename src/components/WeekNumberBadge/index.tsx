import { DateTime } from "luxon";
import React, { FunctionComponent } from "react";
import Badge, { BadgeProps } from "../Badge";
import InlineSkeleton from "../skeleton/InlineSkeleton";

export interface WeekNumberBadgeProps extends BadgeProps {
  date: DateTime;
}

/**
 * A badge displaying the week number.
 *
 * @param {React.PropsWithChildren<WeekNumberBadgeProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered badge.
 */
const WeekNumberBadge: FunctionComponent<WeekNumberBadgeProps> = ({
  date,
  ...props
}) => (
  <Badge {...props}>
    Vecka
    {" "}
    {date?.weekNumber ?? <InlineSkeleton width="1em" />}
  </Badge>
);

export default WeekNumberBadge;
