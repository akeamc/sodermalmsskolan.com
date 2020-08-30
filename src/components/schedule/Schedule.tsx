import { Schedule } from "../../lib/schedule/Schedule";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import { firstLetterUpperCase } from "../../lib/utils/letters";
import * as breakpoints from "../../styles/breakpoints";
import { TimeIndicator } from "./Indicator";
import { GridTitleSection } from "../basic/Typography";
import { useTime } from "../../lib/hooks/time";

const TableWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const Table = styled.div`
  display: grid;
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
  min-width: 1rem;
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

const DayTitleContainer = styled.div`
  border-top: 1px solid var(--accents-2);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayTitle = styled.div``;

const TimeAxisLabel = styled.div<{ priority: boolean }>`
  grid-row: 1;
  grid-column-end: span 6;
  padding: 1rem 0;
  font-feature-settings: "tnum", "ss01";

  ${({ priority }) =>
    !priority &&
    `
    @media (max-width: ${breakpoints.extraLarge}) {
      display: none;
    }
  `}
`;

export const ScheduleViewer: React.FunctionComponent<{
  schedule: Schedule;
}> = ({ schedule }) => {
  const [scheduleStart, scheduleEnd] = schedule.bounds;

  const columnOffset = 2;

  const gridColumnMinimum = scheduleStart - columnOffset; // Account for titles.

  const numberOfColumns = scheduleEnd - scheduleStart;

  const now = useTime(10000);

  return (
    <div>
      <GridTitleSection
        title={schedule.group}
        description={`Nästa lektion: ${schedule.nextPeriod(now).summary}.`}
      />
      <TableWrapper>
        <Table>
          <TimeIndicator schedule={schedule} />

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
                    priority={minutes % 60 === 0}
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
                <DayTitleContainer style={{ gridRow }}>
                  <DayTitle>
                    {firstLetterUpperCase(
                      moment()
                        .locale("sv")
                        .day(index + 1)
                        .format("ddd")
                    )}
                  </DayTitle>
                </DayTitleContainer>

                <HorizontalStripe
                  row={gridRow}
                  columnEnd={numberOfColumns + 1}
                />

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
          })}
        </Table>
      </TableWrapper>
    </div>
  );
};
