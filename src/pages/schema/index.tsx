import React from "react";
import { Schedules } from "../../lib/schedule/Schedule";
import moment from "moment";

const Page: React.FunctionComponent = () => {
  return (
    <main>
      {Schedules.map((schedule, index) => {
        return (
          <div key={index}>
            <h1>{schedule.group}</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {schedule.days.map((day, index) => {
                return (
                  <div key={index}>
                    <h2>
                      {moment()
                        .locale("sv")
                        .day(index + 1)
                        .format("dddd")}
                    </h2>
                    <ul>
                      {day.map((period, index) => {
                        return (
                          <li key={index}>
                            <period.Component />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Page;
