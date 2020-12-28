import React, { FunctionComponent } from "react";
import { CHOICES } from "../../../lib/schedule/choice";
import FilterCategory from "./Category";

const ScheduleFilter: FunctionComponent = () => (
  <div css={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
    gap: "1rem",
    marginBottom: "2rem",
  }}
  >
    {CHOICES.map((choice) => <FilterCategory choice={choice} key={choice.id} />)}
  </div>
);

export default ScheduleFilter;
