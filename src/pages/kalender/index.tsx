import { NextPage } from "next";
import React from "react";
import CalendarSidebar from "../../components/calendar/CalendarSidebarContent";
import MainCalendar from "../../components/calendar/MainCalendar";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import { CalendarContextProvider } from "../../lib/calendar/CalendarContext";

/**
 * Calendar page.
 *
 * @returns {React.ReactElement} Rendered page.
 */
const CalendarPage: NextPage = () => (
  <CalendarContextProvider>
    <DashboardContainer aside={
      <CalendarSidebar />
    }
    >
      <MainCalendar />
    </DashboardContainer>
  </CalendarContextProvider>
);

export default CalendarPage;
