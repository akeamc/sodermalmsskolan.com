import { DateTime } from "luxon";
import RRule from "rrule";
import CalendarEventDetails, { getEventDetailsCharacteristics } from "./CalendarEventDetails";
import CalendarEventInstance from "./CalendarEventInstance";

/**
 * Normalize a strange date. Makes it easier to handle.
 *
 * @param {Date} input The strange date.
 *
 * @returns {DateTime} The charm date.
 */
export const normalizeRRuleDate = (input: Date): DateTime => (
  DateTime.fromJSDate(input)
    .toUTC()
    .setZone("local", { keepLocalTime: true })
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
   * @param {DateTime} after Lower time limit.
   * @param {DateTime} before Upper time limit.
   * @param {boolean} inclusive Should the limits be inclusive?
   *
   * @returns {CalendarEventInstance[]} The "rendered" `CalendarEventInstance`s.
   */
  public evaluate(after: DateTime, before: DateTime, inclusive = true): CalendarEventInstance[] {
    const occurrences = this.rrule
      .between(after.toUTC().toJSDate(), before.toUTC().toJSDate(), inclusive)
      .map(normalizeRRuleDate)
      // Time zones are horrific.
      .filter((timestamp) => {
        if (inclusive) {
          return timestamp >= after && timestamp <= before;
        }

        return timestamp > after && timestamp < before;
      });

    return occurrences.map((start) => new CalendarEventInstance(start, this.details));
  }
}
