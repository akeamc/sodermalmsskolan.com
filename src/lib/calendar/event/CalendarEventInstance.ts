import CalendarEvent from "./CalendarEvent";

export default class CalendarEventInstance {
  start: Date;

  data: CalendarEvent;

  constructor(start: Date, data: CalendarEvent) {
    this.start = start;
    this.data = data;
  }

  public get characteristics(): string[] {
    return this.data.characteristics.concat([
      this.start.getTime().toString(),
    ]);
  }

  public get signature(): string {
    return this.characteristics.join(".");
  }
}
