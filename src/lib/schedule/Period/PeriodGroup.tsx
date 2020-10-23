import { SinglePeriod } from "./SinglePeriod";
import { Period, PeriodBoundary } from ".";
import React from "react";
import { Subject, Subjects } from "../Subject";
import styled from "styled-components";
import { PeriodComponent } from "./PeriodComponent";

export class GroupedPeriod extends SinglePeriod {
  public group: string;

  constructor(
    [start, end]: [number, number],
    day: number,
    subject: Subject,
    room: string,
    group: string
  ) {
    super([start, end], day, subject, room);
    this.group = group;
  }

  public Component: React.FunctionComponent = () => (
    <PeriodComponent
      start={this.start.format()}
      end={this.end.format()}
      room={this.room}
      title={`${this.subject.symbol} ${this.group}`}
      color={this.subject.color}
    />
  );
}

const PeriodGroupWrapper = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
`;

const PeriodContainer = styled.div`
  > * {
    width: 100%;
  }
`;

/**
 * A group of parallel periods for different teaching groups.
 */
export class PeriodGroup implements Period {
  /**
   * The name of the group of groups.
   */
  groupCategory: string;
  periods: GroupedPeriod[];

  constructor(periods: GroupedPeriod[], groupGroup: string) {
    this.periods = periods;
    this.groupCategory = groupGroup;
  }

  public Component: React.FunctionComponent = () => {
    const [groupStart] = this.bounds;

    return (
      <PeriodGroupWrapper>
        {this.periods.map((period, index) => {
          const gridColumnStart = period.start.scheduleTime + 1 - groupStart;
          const gridColumnEnd = period.end.scheduleTime + 1 - groupStart;

          return (
            <PeriodContainer
              key={index}
              style={{
                gridColumnStart,
                gridColumnEnd,
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
        return [
          Math.min(minimum, period.start.scheduleTime),
          Math.max(maximum, period.end.scheduleTime),
        ];
      },
      [60 * 24, 0]
    );
  }

  public get summary(): string {
    return this.periods.map((period) => period.summary).join(", ");
  }

  public get day(): number {
    return this.periods[0].day;
  }

  public get start(): PeriodBoundary {
    return new PeriodBoundary(this.day, this.bounds[0]);
  }

  public get end(): PeriodBoundary {
    return new PeriodBoundary(this.day, this.bounds[1]);
  }

  public get duration(): number {
    const [start, end] = this.bounds;

    return end - start;
  }

  public get groups(): string[] {
    return Array.from(
      this.periods
        .reduce((groups, period) => {
          return groups.add(period.group);
        }, new Set<string>())
        .values()
    );
  }

  public getPeriodByGroup(group: string): SinglePeriod {
    return (
      this.periods.find((period) => period.group === group) || this.periods[0]
    );
  }
}

type PracticalSubject = [[number, number], string];

export const practicalSubjects = (
  day: number,
  {
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
  }
): PeriodGroup =>
  new PeriodGroup(
    [
      new GroupedPeriod(
        chemistry[0],
        day,
        Subjects.Chemistry,
        "A415",
        chemistry[1]
      ),
      new GroupedPeriod(
        hardCrafts[0],
        day,
        Subjects.HardCrafts,
        "B903",
        hardCrafts[1]
      ),
      new GroupedPeriod(
        softCrafts[0],
        day,
        Subjects.SoftCrafts,
        "A306",
        softCrafts[1]
      ),
      new GroupedPeriod(music[0], day, Subjects.Music, "A109", music[1]),
      new GroupedPeriod(
        gastronomy[0],
        day,
        Subjects.Gastronomy,
        "A407",
        gastronomy[1]
      ),
    ],
    "Mentorsgrupp"
  );

export const randomTime = (time: [number, number], day: number): PeriodGroup =>
  new PeriodGroup(
    [
      new GroupedPeriod(time, day, Subjects.Random, "A309", "O9DKA"),
      new GroupedPeriod(time, day, Subjects.Random, "A402", "O9IER"),
      new GroupedPeriod(time, day, Subjects.Random, "A415", "O9JZH"),
      new GroupedPeriod(time, day, Subjects.Random, "A307", "O9LWA"),
      new GroupedPeriod(time, day, Subjects.Random, "A308", "O9MBE"),
    ],
    "Mentorsgrupp"
  );

export const languages = (time: [number, number], day: number): PeriodGroup =>
  new PeriodGroup(
    [
      new GroupedPeriod(time, day, Subjects.Swedish, "A308", "ASVEN"),
      new GroupedPeriod(time, day, Subjects.French, "A221", "M2FR"),
      new GroupedPeriod(time, day, Subjects.Spanish, "A110", "M2SP AAV"),
      new GroupedPeriod(time, day, Subjects.Spanish, "A220", "M2SP CTH"),
      new GroupedPeriod(time, day, Subjects.German, "A309", "M2TY"),
    ],
    "Språkval"
  );
