import { DateTime } from "luxon";
import RRule from "rrule";
import CalendarEventDetails from "../calendar/event/CalendarEventDetails";
import CalendarEventSchedule from "../calendar/event/CalendarEventSchedule";
import { SubjectID, subjects } from "./Subject";

export default interface Period {
  weekdays: number[] | number;
  hour: number;
  minute: number;

  /**
   * Duration of the period (seconds).
   */
  duration: number;
  subject: SubjectID;
  room?: string;
}

export interface PeriodCollection {
  appliesTo: RegExp;
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
export const getPeriodEventSchedules = (period: Period): CalendarEventSchedule[] => {
  const { weekdays, hour, minute } = period;

  return [].concat(weekdays).map((weekday) => {
    const rrule = new RRule({
      dtstart: DateTime
        .utc(2020, 1, 13 + weekday, hour, minute).toJSDate(),
      until: new Date(Date.UTC(2022, 1, 1)),
      freq: RRule.WEEKLY,
      tzid: "Europe/Stockholm",
    });

    const details = getPeriodEventDetails(period);

    return new CalendarEventSchedule(rrule, details);
  });
};
