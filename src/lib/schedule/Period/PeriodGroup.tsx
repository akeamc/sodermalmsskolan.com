import { SinglePeriod } from "./SinglePeriod";
import { Period } from ".";
import React from "react";
import { Subject, Subjects } from "../Subject";
import styled from "styled-components";
import { PeriodComponent } from "./PeriodComponent";

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

  public Component: React.FunctionComponent = () => (
    <PeriodComponent
      start={this.hourMinuteStart}
      end={this.hourMinuteEnd}
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
  groupGroup: string;
  periods: GroupedPeriod[];

  constructor(periods: GroupedPeriod[], groupGroup: string) {
    this.periods = periods;
    this.groupGroup = groupGroup;
  }

  public Component: React.FunctionComponent<{ filterGroups?: string[] }> = ({
    filterGroups,
  }) => {
    const [groupStart] = this.bounds;

    const periods = this.periods.reduce((periods, period) => {
      if (!filterGroups || filterGroups?.includes(period.group)) {
        periods.push(period);
      }

      return periods;
    }, []);

    return (
      <PeriodGroupWrapper>
        {periods.map((period, index) => {
          const gridColumnStart = period.start + 1 - groupStart;
          const gridColumnEnd = period.end + 1 - groupStart;

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
        return [Math.min(minimum, period.start), Math.max(maximum, period.end)];
      },
      [60 * 24, 0]
    );
  }

  public get summary(): string {
    return this.periods.map((period) => period.summary).join(", ");
  }

  public get duration() {
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
  new PeriodGroup(
    [
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
    ],
    "Mentorsgrupp"
  );

export const randomTime = (time: [number, number]) =>
  new PeriodGroup(
    [
      new GroupedPeriod(time, Subjects.Random, "A309", "O9DKA"),
      new GroupedPeriod(time, Subjects.Random, "A402", "O9IER"),
      new GroupedPeriod(time, Subjects.Random, "A415", "O9JZH"),
      new GroupedPeriod(time, Subjects.Random, "A307", "O9LWA"),
      new GroupedPeriod(time, Subjects.Random, "A308", "O9MBE"),
    ],
    "Mentorsgrupp"
  );

export const languages = (time: [number, number]) =>
  new PeriodGroup(
    [
      new GroupedPeriod(time, Subjects.Swedish, "A308", "ASVEN"),
      new GroupedPeriod(time, Subjects.French, "A221", "M2FR"),
      new GroupedPeriod(time, Subjects.Spanish, "A110", "M2SP AAV"),
      new GroupedPeriod(time, Subjects.Spanish, "A220", "M2SP CTH"),
      new GroupedPeriod(time, Subjects.German, "A309", "M2TY"),
    ],
    "Språkval"
  );
