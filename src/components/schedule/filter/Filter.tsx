import React, { FunctionComponent } from "react";
import { CHOICES } from "../../../lib/schedule/choice";
import FilterCategory from "./Category";

const ScheduleFilter: FunctionComponent = () => (
  <div css={{
    marginBottom: "2rem",
  }}
  >
    <div css={{
      display: "flex",
      margin: "-1rem",
      flexWrap: "wrap",
    }}
    >
      {CHOICES.map((choice) => <FilterCategory choice={choice} key={choice.id} />)}
    </div>
  </div>
);

export default ScheduleFilter;
