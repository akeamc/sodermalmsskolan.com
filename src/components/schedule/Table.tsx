import React, { FunctionComponent } from "react";
import usePeriods from "../../lib/schedule/hooks/usePeriods";
import Calendar from "../calendar/Calendar";

/**
 * A `Calendar` displaying the periods.
 *
 * @returns {React.ReactElement} The rendered calendar.
 */
const ScheduleTable: FunctionComponent = () => {
  const periods = usePeriods();

  const events = periods?.map((period) => period.scheduledEvent());

  return (
    <Calendar hideWeekend shrink events={events} />
  );
};

export default ScheduleTable;
