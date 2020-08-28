import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import { ScheduleViewer } from "../../components/schedule/Schedule";

const Page: React.FunctionComponent = () => {
  return (
    <main>
      {Schedules.map((schedule, index) => {
        return <ScheduleViewer schedule={schedule} key={index} />;
      })}
    </main>
  );
};

export default Page;
