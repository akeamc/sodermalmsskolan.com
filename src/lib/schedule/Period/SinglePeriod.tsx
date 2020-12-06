import { Period, PeriodBoundary } from ".";
import { Subject } from "../Subject";
import React from "react";

export class SinglePeriod implements Period {
  public readonly start: PeriodBoundary;
  public readonly end: PeriodBoundary;
  public readonly subject: Subject;
  public readonly room: string;
  public readonly day: number;

  constructor(
    [start, end]: [number, number],
    day: number,
    subject: Subject,
    room: string
  ) {
    this.start = new PeriodBoundary(day, start);
    this.end = new PeriodBoundary(day, end);
    this.day = day;
    this.subject = subject;
    this.room = room;
  }

  /**
   * The duration of this period as a number of five-minute blocks.
   */
  public get duration(): number {
    return Math.abs(this.end.scheduleTime - this.start.scheduleTime);
  }

  public get bounds(): [number, number] {
    return [this.start.scheduleTime, this.end.scheduleTime];
  }

  public get summary(): string {
    return `${this.subject.name} ${this.start.format()} i ${this.room}`;
  }

  public get groups(): null {
    return null;
  }

  public getPeriodByGroup(): SinglePeriod {
    return this;
  }
}
