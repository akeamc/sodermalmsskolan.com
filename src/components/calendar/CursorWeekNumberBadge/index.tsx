import classNames from "classnames/bind";
import { AnimatePresence } from "framer-motion";
import React, { FunctionComponent } from "react";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import { BadgeProps } from "../../Badge";
import WeekNumberBadge from "../../WeekNumberBadge";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

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
    <div className={cx("container")}>
      <AnimatePresence>
        <WeekNumberBadge key={cursor?.weekNumber} date={cursor} {...props} />
      </AnimatePresence>
    </div>
  );
};

export default CursorWeekNumberBadge;
