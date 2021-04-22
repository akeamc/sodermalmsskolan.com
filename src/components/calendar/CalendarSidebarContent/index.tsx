import React, { FunctionComponent } from "react";
import LetterWidget from "../../letter/LetterWidget";
import MenuCard from "../../menu/MenuCard";
import CalendarMonthWidget from "../CalendarMonthWidget";

/**
 * The content of the calendar sidebar.
 *
 * @returns {React.ReactElement} Rendered contents.
 */
const CalendarSidebarContent: FunctionComponent = () => (
  <>
    <section>
      <CalendarMonthWidget />
    </section>
    <section>
      <MenuCard />
    </section>
    <section>
      <LetterWidget />
    </section>
  </>
);

export default CalendarSidebarContent;
