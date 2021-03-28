import { DateTime } from "luxon";
import RRule from "rrule";
import CalendarEventDetails, { getEventDetailsCharacteristics } from "./CalendarEventDetails";
import CalendarEventInstance from "./CalendarEventInstance";

/**
 * Normalize a strange date. Makes it easier to handle.
 *
 * @param {Date} input The strange date.
 *
 * @returns {Date} The charm date.
 */
export const normalizeRRuleDate = (input: Date): Date => (
  DateTime.fromJSDate(input)
    .toUTC()
    .setZone("local", { keepLocalTime: true })
    .toJSDate()
);

/**
 * A calendar event schedule with an RRule.
 */
export default class CalendarEventSchedule {
  rrule: RRule;

  details: CalendarEventDetails;

  constructor(rrule: RRule, details: CalendarEventDetails) {
    this.rrule = rrule;
    this.details = details;
  }

  public characteristics(): string[] {
    return getEventDetailsCharacteristics(this.details).concat([
      this.rrule.toString(),
    ]);
  }

  public signature(): string {
    return this.characteristics().join(".");
  }

  /**
   * Find all scheduled events within a timeframe.
   *
   * @param {Date} after Lower time limit.
   * @param {Date} before Upper time limit.
   * @param {boolean} inclusive Should the limits be inclusive?
   *
   * @returns {CalendarEventInstance[]} The "rendered" `CalendarEventInstance`s.
   */
  public evaluate(after: Date, before: Date, inclusive = true): CalendarEventInstance[] {
    const occurrences = this.rrule
      .between(after, before, inclusive)
      .map(normalizeRRuleDate);

    return occurrences.map((start) => new CalendarEventInstance(start, this.details));
  }
}
