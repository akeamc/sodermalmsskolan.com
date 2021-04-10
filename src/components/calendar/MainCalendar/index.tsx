/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames/bind";
import React, { FunctionComponent, useCallback, useEffect } from "react";
import useKeypressEffect from "../../../hooks/useKeypressEffect";
import { useCalendarContext } from "../../../lib/calendar/CalendarContext";
import capitalize from "../../../lib/utils/capitalize";
import PageHeading from "../../typography/headings/PageHeading";
import CalendarTable from "../CalendarTable";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

/**
 * A component returning different calendars depending on the specified `scope`.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const CalendarController: FunctionComponent = () => {
  const { scope } = useCalendarContext();

  switch (scope) {
    case "month":
      return <p>month</p>;
    default:
      return <CalendarTable />;
  }
};

/**
 * The main calendar component component, displaying the events.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const MainCalendar: FunctionComponent = () => {
  const { cursor, setScope } = useCalendarContext();

  const keypressCallback = useCallback(({ code }: KeyboardEvent) => {
    if (code === "KeyW") {
      setScope("week");
    } else if (code === "KeyD") {
      setScope("day");
    }
  }, [setScope]);

  useKeypressEffect(keypressCallback);

  return (
    <div className={cx("base")}>
      <PageHeading>
        {capitalize(cursor.toLocaleString({
          year: "numeric",
          month: "long",
        }))}
      </PageHeading>
      <CalendarController />
    </div>
  );
};

export default MainCalendar;
