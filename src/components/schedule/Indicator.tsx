import styled from "styled-components";
import { useTime } from "../../hooks/time";
import React, { useState, useEffect } from "react";
import { Schedule } from "../../lib/schedule/Schedule";

const StyledTimeIndicator = styled.div<{
  row: number;
  columnEnd: number;
  progress: number;
}>`
  grid-row-start: ${({ row }) => row};
  grid-column-start: 2;
  grid-row-end: span 1;
  grid-column-end: ${({ columnEnd }) => columnEnd};
  display: flex;

  &::after {
    content: "";
    z-index: 0;
    width: ${({ progress }) => `${progress * 100}%`};
    height: 100%;
    background-color: var(--accents-2);
    opacity: 0.75;
    pointer-events: none;
  }
`;

export const TimeIndicator: React.FunctionComponent<{
  schedule: Schedule;
  day: number;
}> = ({ schedule, day }) => {
  const now = useTime(1000);

  const [progress, setProgress] = useState<number>(0);

  const [scheduleStart, scheduleEnd] = schedule.bounds;

  const numberOfColumns = scheduleEnd - scheduleStart;

  useEffect(() => {
    const currentTime = Schedule.dateToScheduleTime(now);
    const currentDay = Schedule.dateToDayIndex(now);

    setProgress(currentDay > day ? 1 : 0);

    if (day === currentDay) {
      setProgress(
        Math.min(
          Math.max((currentTime - scheduleStart) / schedule.maximumDuration, 0),
          1
        )
      );
    }
  });

  return (
    <StyledTimeIndicator
      columnEnd={numberOfColumns + 2}
      row={day + 2}
      progress={progress}
    />
  );
};
