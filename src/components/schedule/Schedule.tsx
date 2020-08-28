import { Schedule } from "../../lib/schedule/Schedule";
import React from "react";
import styled from "styled-components";
import moment from "moment";

const Table = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
`;

const DayTitle = styled.h2`
  grid-row: 1;
`;

const PeriodWrapper = styled.div`
  display: flex;

  > * {
    flex: 1;
  }
`;

export const ScheduleViewer: React.FunctionComponent<{
  schedule: Schedule;
}> = ({ schedule }) => {
  const [minimum] = schedule.bounds;

  const gridRowMinimum = minimum - 2; // Account for titles.

  return (
    <div>
      <h1>{schedule.group}</h1>
      <Table>
        {schedule.days.map((_, index) => (
          <DayTitle key={index}>
            {moment()
              .locale("sv")
              .day(index + 1)
              .format("dddd")}
          </DayTitle>
        ))}

        {schedule.days.map((day, index) => {
          const gridColumn = index + 1;

          return day.map((period, index) => {
            const [start, end] = period.bounds;

            const gridRowStart = start - gridRowMinimum;
            const gridRowEnd = end - gridRowMinimum;

            return (
              <PeriodWrapper
                style={{ gridColumn, gridRowStart, gridRowEnd }}
                key={index}
              >
                <period.Component />
              </PeriodWrapper>
            );
          });
        })}
      </Table>
    </div>
  );
};
