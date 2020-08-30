import { Schedule } from "../../lib/schedule/Schedule";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import { firstLetterUpperCase } from "../../lib/utils/letters";

const Table = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-auto-columns: 1fr;
`;

const VerticalStripe = styled.div<{
  column: number;
  rowEnd: number;
  highlighted: boolean;
}>`
  grid-row-start: ${({ highlighted }) => (highlighted ? 1 : 2)};
  grid-row-end: ${({ rowEnd }) => rowEnd};
  grid-column-start: ${({ column }) => column};
  grid-column-end: span 1;
  border-left: ${({ highlighted }) =>
    highlighted ? `1px solid var(--accents-2)` : `1px dotted var(--accents-2)`};
`;

const HorizontalStripe = styled.div<{
  row: number;
  columnEnd: number;
}>`
  grid-row: ${({ row }) => row};
  grid-column-start: 2;
  grid-column-end: ${({ columnEnd }) => columnEnd};
  border-top: 1px solid var(--accents-2);
`;

const PeriodWrapper = styled.div`
  > * {
    width: 100%;
  }
`;

const DayTitle = styled.div`
  border-top: 1px solid var(--accents-2);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeAxisLabel = styled.div`
  grid-row: 1;
  grid-column-end: span 6;
  padding: 1rem 0;
  font-feature-settings: "tnum", "ss01";
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
        {Array.from({ length: numberOfColumns }, (_, index) => {
          const time = scheduleStart + index;
          const minutes = 5 * (time % 12);
          const hours = Math.floor(time / 12);

          const showLabel = minutes % 30 === 0;

          return (
            <>
              <VerticalStripe
                column={index + 2}
                rowEnd={schedule.days.length + 2}
                highlighted={showLabel}
              />
              {showLabel && (
                <TimeAxisLabel
                  style={{
                    gridColumnStart: index + 2,
                  }}
                  key={index}
                >
                  {hours.toString().padStart(2, "0")}:
                  {minutes.toString().padStart(2, "0")}
                </TimeAxisLabel>
              )}
            </>
          );
        })}

        {schedule.days.map((day, index) => {
          const gridRow = index + 2;

          return (
            <>
              <DayTitle style={{ gridRow }}>
                {firstLetterUpperCase(
                  moment()
                    .locale("sv")
                    .day(index + 1)
                    .format("ddd")
                )}
              </DayTitle>

              <HorizontalStripe row={gridRow} columnEnd={numberOfColumns + 1} />

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
