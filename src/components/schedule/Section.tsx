import React, { FunctionComponent } from "react";
import Section, { SectionProps } from "../Section";
import ScheduleTable from "./Table";

const ScheduleSection: FunctionComponent<SectionProps> = ({ ...sectionProps }) => (
  <Section {...sectionProps}>
    <ScheduleTable />
  </Section>
);

export default ScheduleSection;
