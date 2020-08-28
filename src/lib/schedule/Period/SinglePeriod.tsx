import { Period } from ".";
import { Subject } from "../Subject";
import React from "react";

export class SinglePeriod implements Period {
  /**
   * When the period starts. Equal to the number of minutes since midnight.
   */
  start: number;

  /**
   * When the period ends. Equal to the number of minutes since midnight.
   */
  end: number;
  subject: Subject;
  room: string;

  constructor([start, end]: [number, number], subject: Subject, room: string) {
    this.start = start;
    this.end = end;
    this.subject = subject;
    this.room = room;
  }

  private humanTimestamp(timestamp: number): [number, number] {
    const minutes = Math.floor(timestamp % 60);
    const hours = Math.floor(timestamp / 60);

    return [hours, minutes];
  }

  private hourMinuteTimestamp(
    timestamp: number,
    delimeter: string = ":"
  ): string {
    return this.humanTimestamp(timestamp)
      .map((digits) => digits.toString().padStart(2, "0"))
      .join(delimeter);
  }

  /**
   * The duration of this period in minutes.
   */
  public get duration(): number {
    return Math.abs(this.end - this.start);
  }

  public get humanStart() {
    return this.humanTimestamp(this.start);
  }

  public get hourMinuteStart() {
    return this.hourMinuteTimestamp(this.start);
  }

  public get humanEnd() {
    return this.humanTimestamp(this.end);
  }

  public get hourMinuteEnd() {
    return this.hourMinuteTimestamp(this.end);
  }

  public Component: React.FunctionComponent = () => {
    return (
      <div style={{ color: this.subject.color }}>
        {this.hourMinuteStart} - {this.hourMinuteEnd} {this.subject.name}{" "}
        {this.room} ({this.duration} min)
      </div>
    );
  };
}
