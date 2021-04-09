import React, { FunctionComponent } from "react";
import MenuCard from "../../menu/MenuCard";
import CalendarWidget from "../CalendarWidget";

/**
 * The content of the calendar sidebar.
 *
 * @returns {React.ReactElement} Rendered contents.
 */
const CalendarSidebarContent: FunctionComponent = () => (
  <>
    <section>
      <CalendarWidget />
    </section>
    <section>
      <MenuCard />
    </section>
  </>
);

export default CalendarSidebarContent;
