import { DateTime } from "luxon";
import RRule from "rrule";
import CalendarEvent, { CalendarEventCharacteristics } from "./CalendarEvent";
import CalendarEventInstance from "./CalendarEventInstance";

/**
 * Normalize a strange date. Makes it easier to handle.
 *
 * @param input
 */
export const normalizeRRuleDate = (input: Date): Date => (
  DateTime.fromJSDate(input)
    .toUTC()
    .setZone("local", { keepLocalTime: true })
    .toJSDate()
);

export default class ScheduledCalendarEvent {
  rrule: RRule;

  data: CalendarEvent;

  constructor(rrule: RRule, data: CalendarEvent) {
    this.rrule = rrule;
    this.data = data;
  }

  public get characteristics(): CalendarEventCharacteristics {
    return this.data.characteristics.concat([
      this.rrule.toString(),
    ]);
  }

  public get signature(): string {
    return this.characteristics.join(".");
  }

  /**
   * Find all scheduled events within a timeframe.
   *
   * @param after
   * @param before
   */
  public evaluate(after: Date, before: Date): CalendarEventInstance[] {
    const occurrences = this.rrule
      .between(after, before)
      .map(normalizeRRuleDate);

    return occurrences.map((start) => new CalendarEventInstance(start, this.data));
  }
}
