import { Schedule } from "../../lib/schedule/Schedule";
import React from "react";
import styled from "styled-components";
import moment from "moment";

const Table = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: 1fr;
`;

const StripedBackground = styled.div<{ columns: number; days: number }>`
  grid-row-start: 1;
  grid-column-start: 2;
  border-left: 1px solid var(--accents-2);

  ${({ columns, days }) => `
    background: repeating-linear-gradient(90deg, transparent, transparent calc(${
      100 / columns
    }% - 1px), var(--accents-2) calc(${
    100 / columns
  }% - 1px), var(--accents-2) ${100 / columns}%);
    grid-row-end: span ${days + 1};
    grid-column-end: span ${columns};
  `}
`;

const PeriodWrapper = styled.div`
  display: flex;

  > * {
    flex: 1;
  }
`;

const DayTitle = styled.div`
  border-top: 1px solid var(--accents-2);
  padding: 1rem;
`;

const TimeAxisLabel = styled.div`
  grid-row: 1;
  grid-column-end: span 6;
  padding: 1rem 0;
`;

export const ScheduleViewer: React.FunctionComponent<{
  schedule: Schedule;
}> = ({ schedule }) => {
  const [scheduleStart, scheduleEnd] = schedule.bounds;

  const columnOffset = 2;

  const gridColumnMinimum = scheduleStart - columnOffset; // Account for titles.

  const numberOfColumns = scheduleEnd - scheduleStart;

  const next = schedule.nextPeriod();

  return (
    <div>
      <h1>{schedule.group}</h1>
      {/* <p>Nästa lektion: {next?.summary}</p> */}
      <Table>
        <StripedBackground
          columns={numberOfColumns}
          days={schedule.days.length}
        />

        {Array.from({ length: numberOfColumns }, (_, index) => {
          const time = scheduleStart + index;
          const minutes = 5 * (time % 12);
          const hours = Math.floor(time / 12);

          if (minutes % 30 === 0) {
            return (
              <TimeAxisLabel
                style={{
                  gridColumnStart: index + 2,
                }}
                key={index}
              >
                {hours.toString().padStart(2, "0")}:
                {minutes.toString().padStart(2, "0")}
              </TimeAxisLabel>
            );
          }
        })}

        {schedule.days.map((day, index) => {
          const gridRow = index + 2;

          return (
            <>
              <DayTitle style={{ gridRow }}>
                {moment()
                  .locale("sv")
                  .day(index + 1)
                  .format("ddd")}
              </DayTitle>

              {day.map((period, index) => {
                const [start, end] = period.bounds;

                const gridColumnStart = start - gridColumnMinimum;
                const gridColumnEnd = end - gridColumnMinimum;

                return (
                  <PeriodWrapper
                    key={index}
                    style={{ gridRow, gridColumnStart, gridColumnEnd }}
                  >
                    <period.Component />
                  </PeriodWrapper>
                );
              })}
            </>
          );
          // const gridColumn = index + 1;

          // return day.map((period, index) => {
          //   const [start, end] = period.bounds;

          //   const gridRowStart = start - gridRowMinimum;
          //   const gridRowEnd = end - gridRowMinimum;

          //   return (
          //     <PeriodWrapper
          //       style={{ gridColumn, gridRowStart, gridRowEnd }}
          //       key={index}
          //     >
          //       <period.Component />
          //     </PeriodWrapper>
          //   );
          // });
        })}
      </Table>
    </div>
  );
};
