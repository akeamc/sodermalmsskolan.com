import { NextPage } from "next";
import React from "react";
import CalendarWidget from "../../components/calendar/CalendarWidget";
import MainCalendar from "../../components/calendar/MainCalendar";
import { CalendarContextProvider } from "../../lib/calendar/CalendarContext";

/**
 * Calendar page.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const CalendarPage: NextPage = () => (
  <div>
    <CalendarContextProvider>
      <CalendarWidget />
      <MainCalendar />
    </CalendarContextProvider>
  </div>
);

export default CalendarPage;
