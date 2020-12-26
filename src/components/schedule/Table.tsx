import React, { FunctionComponent } from "react";
import usePeriods from "../../lib/schedule/hooks/usePeriods";
import Calendar from "../calendar/Calendar";

const ScheduleTable: FunctionComponent = () => {
  const periods = usePeriods();

  const events = periods?.map((period) => period.calendarEvent());

  return (
    <Calendar hideWeekend events={events} />
  );
};

export default ScheduleTable;
