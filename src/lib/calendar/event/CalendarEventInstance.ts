import CalendarEventDetails, { getEventDetailsCharacteristics } from "./CalendarEventDetails";

/**
 * A `CalendarEvent` with a concrete starting date.
 */
export default class CalendarEventInstance {
  start: Date;

  details: CalendarEventDetails;

  constructor(start: Date, details: CalendarEventDetails) {
    this.start = start;
    this.details = details;
  }

  public get characteristics(): string[] {
    return getEventDetailsCharacteristics(this.details).concat([
      this.start.getTime().toString(),
    ]);
  }

  public get signature(): string {
    return this.characteristics.join(".");
  }
}
