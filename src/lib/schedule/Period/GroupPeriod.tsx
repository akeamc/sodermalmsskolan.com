import { SinglePeriod } from "./SinglePeriod";
import { Period } from ".";
import React from "react";
import { Subject, Subjects } from "../Subject";

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

/**
 * A group of parallel periods for different teaching groups.
 */
export class PeriodGroup implements Period {
  periods: GroupedPeriod[];

  constructor(periods: GroupedPeriod[]) {
    this.periods = periods;
  }

  public Component: React.FunctionComponent = () => {
    return (
      <ul>
        {this.periods.map((period, index) => {
          return (
            <li key={index}>
              <period.Component />
            </li>
          );
        })}
      </ul>
    );
  };
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
