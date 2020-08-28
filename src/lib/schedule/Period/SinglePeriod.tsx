import { Period } from ".";
import { Subject } from "../Subject";
import React from "react";
import styled from "styled-components";

const PeriodContainer = styled.div<{ color: string }>`
  padding: 1rem;
  box-sizing: border-box;
  border-bottom: 2px solid ${({ color }) => color};
  /* The "color" property is a hex code. */
  ${({ color }) => `
    background-color: ${color}1f;
  `}
`;

const PeriodHeading = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

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
    const minutes = Math.floor(timestamp % 12) * 5;
    const hours = Math.floor(timestamp / 12);

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

  public get bounds(): [number, number] {
    return [this.start, this.end];
  }

  public Component: React.FunctionComponent = () => {
    return (
      <PeriodContainer color={this.subject.color}>
        <PeriodHeading>
          <small>
            {this.hourMinuteStart}–{this.hourMinuteEnd}
          </small>
          <small>{this.room}</small>
        </PeriodHeading>
        <p>{this.subject.symbol}</p>
      </PeriodContainer>
    );
  };
}
