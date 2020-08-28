import { SinglePeriod } from "./SinglePeriod";
import { Period } from ".";
import React from "react";
import { Subject, Subjects } from "../Subject";
import styled from "styled-components";

export class GroupedPeriod extends SinglePeriod {
  public group: string;

  constructor(
    [start, end]: [number, number],
    subject: Subject,
    room: string,
    group: string
  ) {
    super([start, end], subject, room);
    this.group = group;
  }
}

const PeriodGroupWrapper = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: column;
`;

const PeriodContainer = styled.div`
  display: flex;

  > * {
    flex: 1;
  }
`;

/**
 * A group of parallel periods for different teaching groups.
 */
export class PeriodGroup implements Period {
  periods: GroupedPeriod[];

  constructor(periods: GroupedPeriod[]) {
    this.periods = periods;
  }

  public Component: React.FunctionComponent = () => {
    const [groupStart, groupEnd] = this.bounds;

    return (
      <PeriodGroupWrapper>
        {this.periods.map((period, index) => {
          const gridRowStart = period.start + 1 - groupStart;
          const gridRowEnd = period.end + 1 - groupStart;

          return (
            <PeriodContainer
              key={index}
              style={{
                gridRowStart,
                gridRowEnd,
              }}
            >
              <period.Component />
            </PeriodContainer>
          );
        })}
      </PeriodGroupWrapper>
    );
  };

  public get bounds(): [number, number] {
    return this.periods.reduce(
      ([minimum, maximum], period) => {
        return [Math.min(minimum, period.start), Math.max(maximum, period.end)];
      },
      [60 * 24, 0]
    );
  }

  public get duration() {
    const [start, end] = this.bounds;

    return end - start;
  }
}

type PracticalSubject = [[number, number], string];

export const practicalSubjects = ({
  chemistry,
  hardCrafts,
  softCrafts,
  music,
  gastronomy,
}: {
  chemistry: PracticalSubject;
  hardCrafts: PracticalSubject;
  softCrafts: PracticalSubject;
  music: PracticalSubject;
  gastronomy: PracticalSubject;
}) =>
  new PeriodGroup([
    new GroupedPeriod(chemistry[0], Subjects.Chemistry, "A415", chemistry[1]),
    new GroupedPeriod(
      hardCrafts[0],
      Subjects.HardCrafts,
      "B903",
      hardCrafts[1]
    ),
    new GroupedPeriod(
      softCrafts[0],
      Subjects.SoftCrafts,
      "A306",
      softCrafts[1]
    ),
    new GroupedPeriod(music[0], Subjects.Music, "A109", music[1]),
    new GroupedPeriod(
      gastronomy[0],
      Subjects.Gastronomy,
      "A407",
      gastronomy[1]
    ),
  ]);
