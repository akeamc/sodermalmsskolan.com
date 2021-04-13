import { DateTime } from "luxon";
import CalendarEventDetails, { getEventDetailsCharacteristics } from "./CalendarEventDetails";

/**
 * A `CalendarEvent` with a concrete starting date.
 */
export default class CalendarEventInstance {
  start: DateTime;

  details: CalendarEventDetails;

  constructor(start: DateTime, details: CalendarEventDetails) {
    this.start = start;
    this.details = details;
  }

  public get characteristics(): string[] {
    return getEventDetailsCharacteristics(this.details).concat([
      this.start.toISO(),
    ]);
  }

  public get signature(): string {
    return this.characteristics.join(".");
  }

  public get end(): DateTime {
    return this.start.plus({
      seconds: this.details.duration,
    });
  }
}
