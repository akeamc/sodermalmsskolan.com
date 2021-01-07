export type CalendarEventCharacteristics = string[];

export interface CalendarEventData {
  duration: number;
  title: string;
  shortTitle?: string;
  description?: string;
  color?: string;
  location?: string;
  canceled?: boolean;
  tag?: string;
  placeholder?: boolean;
}

export default class CalendarEvent implements CalendarEventData {
  /**
   * The duration of the event, in seconds.
   */
  public duration: number;

  public title: string;

  public shortTitle?: string;

  public description?: string;

  public color?: string;

  public location?: string;

  public canceled?: boolean;

  public tag?: string;

  /**
   * Whether the event is a placeholder or not. Should only be used client-side.
   */
  public placeholder?: boolean;

  constructor(data: CalendarEventData) {
    Object.assign(this, data);
  }

  public get characteristics(): CalendarEventCharacteristics {
    const {
      duration,
      title,
      shortTitle = "",
      description = "",
      color = "",
      location = "",
      canceled = false,
      tag = "",
    } = this;

    return [
      duration.toString(),
      title,
      shortTitle,
      description,
      color,
      location,
      canceled ? "1" : "0",
      tag,
    ];
  }

  public get signature(): string {
    return this.characteristics.join(".");
  }
}
