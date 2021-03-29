import RRule from "rrule";
import CalendarEventDetails from "../calendar/event/CalendarEventDetails";
import CalendarEventSchedule from "../calendar/event/CalendarEventSchedule";
import { SubjectID, subjects } from "./Subject";

export default interface Period {
  weekday: number;
  hour: number;
  minute: number;

  /**
   * Duration of the period (seconds).
   */
  duration: number;
  subject: SubjectID;
  room: string;
}

export interface PeriodCollection {
  group: string;
  periods: Period[];
}

/**
 * Convert a period into `CalendarEventDetails`.
 *
 * @param {Period} period The period.
 *
 * @returns {CalendarEventDetails} Details.
 */
export const getPeriodEventDetails = ({
  duration,
  subject: subjectId,
  room,
}: Period): CalendarEventDetails => {
  const subject = subjects[subjectId];

  return {
    duration,
    summary: subject.name,
    color: subject.color,
    location: room,
  };
};

/**
 * Convert a `Period` into a `CalendarEventSchedule`.
 *
 * @param {Period} period The period.
 *
 * @returns {CalendarEventSchedule} The generated schedule.
 */
export const getPeriodEventSchedule = (period: Period): CalendarEventSchedule => {
  const { weekday, hour, minute } = period;

  const rrule = new RRule({
    dtstart: new Date(
      Date.UTC(2020, 0, 13 + weekday, hour, minute), // January 13th, 2020 is a monday.
    ),
    until: new Date(Date.UTC(2022, 1, 1)),
    freq: RRule.WEEKLY,
    tzid: "Europe/Stockholm",
  });

  const details = getPeriodEventDetails(period);

  return new CalendarEventSchedule(rrule, details);
};
