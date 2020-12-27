import React, { FunctionComponent } from "react";
import { ScheduleContextProvider } from "../../lib/schedule/options";
import Section, { SectionProps } from "../section/Section";
import ScheduleFilter from "./Filter";
import ScheduleTable from "./Table";

const ScheduleSection: FunctionComponent<SectionProps> = ({ ...sectionProps }) => (
  <Section {...sectionProps}>
    <ScheduleContextProvider>
      <ScheduleFilter />
      <ScheduleTable />
    </ScheduleContextProvider>
  </Section>
);

export default ScheduleSection;
