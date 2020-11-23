import { Schedule } from "../../lib/schedule/Schedule";
import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { firstLetterUpperCase } from "../../lib/utils/letters";
import { TimeIndicator } from "./Indicator";
import { GridTitleSection } from "../basic/Typography";
import { useTime } from "../../hooks/time";
import { GroupFilter } from "../../lib/schedule/Filter";
import { SinglePeriodComponent } from "../../lib/schedule/Period";
import { useLang } from "../../hooks/lang";

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
  border-left: ${({ theme, highlighted }) =>
    `1px ${highlighted ? "solid" : "dotted"} ${theme.colors.border}`};
  min-width: 1rem;
`;

const HorizontalStripe = styled.div<{
  row: number;
  columnEnd: number;
}>`
  grid-row: ${({ row }) => row};
  grid-column-start: 2;
  grid-column-end: ${({ columnEnd }) => columnEnd};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PeriodWrapper = styled.div<{
  row: number;
  columnStart: number;
  columnEnd: number;
}>`
  grid-row: ${({ row }) => row};
  grid-column-start: ${({ columnStart }) => columnStart};
  grid-column-end: ${({ columnEnd }) => columnEnd};

  > * {
    width: 100%;
  }
`;

const DayTitleContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayTitle = styled.div``;

const TimeAxisLabel = styled.div`
  grid-row: 1;
  grid-column-end: span 6;
  padding: 1rem 0.5rem;
  font-feature-settings: "tnum", "ss01";
`;

const ScheduleDetail: React.FunctionComponent<{
  schedule: Schedule;
  groups?: GroupFilter;
}> = ({ schedule, groups }) => {
  const now = useTime(1000);
  const lang = useLang();
  const nextPeriod = schedule.periods.filterByGroups(groups).next(now);

  return (
    <GridTitleSection
      title={schedule.group}
      description={`Nästa lektion: ${
        nextPeriod?.summary
      } (${nextPeriod.start.nextAbsolute(now).locale(lang).from(now)}).`}
    />
  );
};

export const ScheduleTable: React.FunctionComponent<{
  schedule: Schedule;
  groups?: GroupFilter;
}> = ({ schedule, groups }) => {
  const lang = useLang();

  const [scheduleStart, scheduleEnd] = schedule.bounds;

  const columnOffset = 2;

  const gridColumnMinimum = scheduleStart - columnOffset; // Account for titles.

  const numberOfColumns = scheduleEnd - scheduleStart;

  return (
    <React.Fragment>
      <ScheduleDetail schedule={schedule} groups={groups} />
      <TableWrapper>
        <Table>
          {Array.from({ length: numberOfColumns }, (_, index) => {
            const time = scheduleStart + index;
            const minutes = 5 * (time % 12);
            const hours = Math.floor(time / 12);

            const showLabel = minutes % 30 === 0;

            return (
              <React.Fragment key={index}>
                <VerticalStripe
                  column={index + 2}
                  rowEnd={schedule.days + 2}
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
              </React.Fragment>
            );
          })}

          {Array.from({ length: schedule.days }, (_, index) => {
            const gridRow = index + 2;

            return (
              <React.Fragment key={index}>
                <TimeIndicator schedule={schedule} day={index} />
                <DayTitleContainer style={{ gridRow }}>
                  <DayTitle>
                    {firstLetterUpperCase(
                      dayjs()
                        .locale(lang)
                        .day(index + 1)
                        .format("ddd")
                    )}
                  </DayTitle>
                </DayTitleContainer>
                <HorizontalStripe
                  row={gridRow}
                  columnEnd={numberOfColumns + 2}
                />
              </React.Fragment>
            );
          })}

          {schedule.periods.filterByGroups(groups).map((period, index) => {
            const gridRow = period.day + 2;

            const [start, end] = period.bounds;

            const gridColumnStart = start - gridColumnMinimum;
            const gridColumnEnd = end - gridColumnMinimum;

            return (
              <PeriodWrapper
                key={index}
                row={gridRow}
                columnStart={gridColumnStart}
                columnEnd={gridColumnEnd}
              >
                <SinglePeriodComponent period={period} />
              </PeriodWrapper>
            );
          })}
        </Table>
      </TableWrapper>
    </React.Fragment>
  );
};
