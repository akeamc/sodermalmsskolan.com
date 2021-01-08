import React, { FunctionComponent } from "react";
import { ScheduleContextProvider } from "../../lib/schedule/options";
import Section, { SectionProps } from "../section/Section";
import ScheduleFilter from "./filter/Filter";
import ScheduleTable from "./Table";

/**
 * `<Section>` displaying a schedule.
 *
 * @param {React.PropsWithChildren<SectionProps>} props Props to be passed along to the inner
 * section.
 *
 * @returns {React.ReactElement} The rendered schedule section.
 */
const ScheduleSection: FunctionComponent<SectionProps> = ({ ...sectionProps }) => (
  <Section
    containerProps={{
      width: "wide",
    }}
    {...sectionProps}
  >
    <ScheduleContextProvider>
      <ScheduleFilter />
      <ScheduleTable />
    </ScheduleContextProvider>
  </Section>
);

export default ScheduleSection;
