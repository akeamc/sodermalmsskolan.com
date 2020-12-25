import RRule from "rrule";
import { ScheduledCalendarEvent } from "../calendar/event";
import Subject from "./subject";

export default class Period {
  /**
   * The weekday of the period, with `0` representing **Monday**.
   */
  weekday: number;

  hour: number;

  minute: number;

  /**
   * Duration of the period in **minutes**.
   */
  duration: number;

  subject: Subject;

  room: string;

  constructor(
    weekday: number,
    hour: number,
    minute: number,
    duration: number,
    subject: Subject,
    room: string,
  ) {
    this.weekday = weekday;
    this.hour = hour;
    this.minute = minute;
    this.duration = duration;
    this.subject = subject;
    this.room = room;
  }

  first(): Date {
    // January 13th is a Monday
    return new Date(Date.UTC(2020, 0, 13 + this.weekday, this.hour, this.minute));
  }

  rrule(): RRule {
    return new RRule({
      dtstart: this.first(),
      until: new Date(Date.UTC(2022, 1, 1)),
      freq: RRule.WEEKLY,
      tzid: "Europe/Stockholm",
    });
  }

  calendarEvent(): ScheduledCalendarEvent {
    return {
      rrule: this.rrule(),
      duration: this.duration * 60,
      title: this.subject.name,
      color: this.subject.color,
      location: this.room,
    };
  }
}
