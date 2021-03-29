import RRule from "rrule";
import CalendarEventDetails from "../calendar/event/CalendarEventDetails";
import CalendarEventSchedule from "../calendar/event/CalendarEventSchedule";
import { getHumanReadableDuration } from "../calendar/utils/humanReadable";
import Subject, { SubjectID, subjects } from "./Subject";

export interface PeriodStatic {
  /**
   * The weekday of the period, with `0` representing **Monday**.
   */
  weekday: number;
  hour: number;
  minute: number;
  duration: number;
  subjectID: SubjectID;
  room: string;
}

/**
 * A class representing a period, with utilities for converting to regular calendar events.
 */
export default class Period implements PeriodStatic {
  weekday: number;

  hour: number;

  minute: number;

  duration: number;

  subjectID: SubjectID;

  room: string;

  /**
   * Construct a new period.
   *
   * @param {PeriodStatic} data Period data.
   */
  constructor(
    data: PeriodStatic,
  ) {
    Object.assign(this, data);
  }

  public get subject(): Subject {
    return subjects[this.subjectID];
  }

  public get totalSeconds(): number {
    return this.hour * 3600 + this.minute * 60;
  }

  public first(): Date {
    // January 13th is a Monday
    return new Date(Date.UTC(2020, 0, 13 + this.weekday, this.hour, this.minute));
  }

  public rrule(): RRule {
    return new RRule({
      dtstart: this.first(),
      until: new Date(Date.UTC(2022, 1, 1)),
      freq: RRule.WEEKLY,
      tzid: "Europe/Stockholm",
    });
  }

  public eventDetails(): CalendarEventDetails {
    return {
      duration: this.duration * 60,
      summary: this.subject.name,
      color: this.subject.color,
      location: this.room,
    };
  }

  public eventSchedule(): CalendarEventSchedule {
    return new CalendarEventSchedule(this.rrule(), this.eventDetails());
  }
}
