import React, { FunctionComponent } from "react";
import CalendarWidget from "../CalendarWidget";

/**
 * The content of the calendar sidebar.
 *
 * @returns {React.ReactElement} Rendered contents.
 */
const CalendarSidebarContent: FunctionComponent = () => (
  <>
    <CalendarWidget />
  </>
);

export default CalendarSidebarContent;
