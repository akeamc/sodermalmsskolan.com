import classNames from "classnames/bind";
import { DateTime } from "luxon";
import React, { FunctionComponent, useEffect, useState } from "react";
import useTime from "../../../hooks/useTime";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import useDailyEventInstances from "../../../lib/calendar/hooks/useDailyEventInstances";
import capitalize from "../../../lib/utils/capitalize";
import InlineSkeleton from "../../skeleton/InlineSkeleton";
import CalendarEventDisplay from "../CalendarEventDisplay";
import styles from "./DayColumn.module.scss";

const cx = classNames.bind(styles);

export interface DayColumnheadingProps {
  date: DateTime;
}

/**
 * Heading for a DayColumn.
 *
 * @param {React.PropsWithChildren<DayColumnheadingProps>} props Props.
 *
 * @returns {React.ReactElement} Rendered heading.
 */
export const DayColumnHeading: FunctionComponent<DayColumnheadingProps> = ({
  date,
}) => {
  const { scope, loadingSchedules } = useCalendarContext();
  const now = useTime();
  const [isNow, setIsNow] = useState(false);

  useEffect(() => {
    setIsNow(date.hasSame(now, "day"));
  }, [date, now]);

  const big = scope === "day";

  return (
    <div className={cx("heading", {
      now: isNow,
      big,
    })}
    >
      <h2>
        {loadingSchedules ? <InlineSkeleton width="50%" /> : capitalize(date.toLocaleString({
          weekday: "long",
        }))}
      </h2>
      <h3>
        {loadingSchedules ? <InlineSkeleton width="25%" /> : date.toLocaleString({
          month: "numeric",
          day: "numeric",
        })}
      </h3>
    </div>
  );
};

export interface DayColumnProps {
  date: DateTime,
}

/**
 * A column representing a single day to be used in a weekly calendar.
 *
 * @param {React.PropsWithChildren<DayColumnProps>} props Props.
 *
 * @returns {React.ReactElement} The rendered column.
 */
const DayColumn: FunctionComponent<DayColumnProps> = ({ date }) => {
  const eventInstances = useDailyEventInstances(date);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {eventInstances?.map((event) => (
          <CalendarEventDisplay calendarEvent={event} key={event.signature} />
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
