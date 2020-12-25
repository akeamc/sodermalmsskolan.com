import React, { FunctionComponent } from "react";
import { sharedSchedule } from "../../lib/schedule/schedule";
import Calendar from "../calendar/Calendar";

const ScheduleTable: FunctionComponent = () => (
  <Calendar hideWeekend events={sharedSchedule.map((period) => period.calendarEvent())} />
);

export default ScheduleTable;
